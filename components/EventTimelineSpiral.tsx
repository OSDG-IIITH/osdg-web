'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Event {
    id: string;
    title: string;
    date: Date;
    type: 'workshop' | 'hackathon' | 'talk' | 'social';
    description: string;
    status: 'completed' | 'upcoming' | 'live';
    attendees?: number;
    image?: string;
    rsvpCount?: number;
}

interface EventTimelineSpiralProps {
    events: Event[];
    onEventSelect: (event: Event) => void;
    selectedEvent: Event | null;
}

export default function EventTimelineSpiral({ events, onEventSelect, selectedEvent }: EventTimelineSpiralProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const spiralGroupRef = useRef<THREE.Group>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 10, 20);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create spiral group
        const spiralGroup = new THREE.Group();
        scene.add(spiralGroup);
        spiralGroupRef.current = spiralGroup;

        // Create spiral path
        const spiralRadius = 8;
        const spiralHeight = 30;
        const turns = 3;
        const eventNodes: THREE.Mesh[] = [];

        events.forEach((event, index) => {
            const t = index / (events.length - 1);
            const angle = t * turns * Math.PI * 2;
            const x = Math.cos(angle) * spiralRadius * (1 - t * 0.3);
            const z = Math.sin(angle) * spiralRadius * (1 - t * 0.3);
            const y = t * spiralHeight - spiralHeight / 2;

            // Create event node
            const geometry = event.status === 'completed'
                ? new THREE.SphereGeometry(0.5, 16, 16)
                : new THREE.OctahedronGeometry(0.6, 0);

            const material = new THREE.MeshBasicMaterial({
                color: event.status === 'completed' ? 0x00ff00 :
                    event.status === 'live' ? 0xff0080 : 0x00d4ff,
                transparent: true,
                opacity: event.status === 'upcoming' ? 0.8 : 1.0
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.userData = { event, index };

            // Add glow effect for upcoming events
            if (event.status === 'upcoming') {
                const glowGeometry = new THREE.SphereGeometry(1.2, 16, 16);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: 0x00d4ff,
                    transparent: true,
                    opacity: 0.2
                });
                const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
                glowMesh.position.copy(mesh.position);
                spiralGroup.add(glowMesh);
            }

            spiralGroup.add(mesh);
            eventNodes.push(mesh);
        });

        // Create spiral path line
        const pathPoints = [];
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const angle = t * turns * Math.PI * 2;
            const x = Math.cos(angle) * spiralRadius * (1 - t * 0.3);
            const z = Math.sin(angle) * spiralRadius * (1 - t * 0.3);
            const y = t * spiralHeight - spiralHeight / 2;
            pathPoints.push(new THREE.Vector3(x, y, z));
        }

        const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
        const pathMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.3
        });
        const pathLine = new THREE.Line(pathGeometry, pathMaterial);
        spiralGroup.add(pathLine);

        // Mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event: MouseEvent) => {
            const rect = mountRef.current!.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(eventNodes);

            // Reset all materials
            eventNodes.forEach(node => {
                const material = node.material as THREE.MeshBasicMaterial;
                material.emissive.setHex(0x000000);
            });

            if (intersects.length > 0) {
                const material = intersects[0].object.material as THREE.MeshBasicMaterial;
                material.emissive.setHex(0x333333);
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        };

        const handleClick = (event: MouseEvent) => {
            const rect = mountRef.current!.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(eventNodes);

            if (intersects.length > 0) {
                const eventData = intersects[0].object.userData.event;
                onEventSelect(eventData);
            }
        };

        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleClick);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate spiral slowly
            spiralGroup.rotation.y += 0.005;

            // Animate event nodes
            eventNodes.forEach((node, index) => {
                node.rotation.x += 0.01;
                node.rotation.y += 0.02;

                // Pulse effect for live events
                const event = node.userData.event;
                if (event.status === 'live') {
                    const scale = 1 + Math.sin(Date.now() * 0.01 + index) * 0.2;
                    node.scale.setScalar(scale);
                }
            });

            renderer.render(scene, camera);
        };

        animate();
        setIsLoading(false);

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('click', handleClick);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [events, onEventSelect]);

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-lg border border-green-500/20">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-green-400 font-mono">Loading Timeline Nexus...</div>
                </div>
            )}
            <div ref={mountRef} className="w-full h-full" />

            {/* Navigation hints */}
            <div className="absolute bottom-4 left-4 text-green-400 font-mono text-sm">
                <div>Click nodes to view events</div>
                <div>Mouse to explore</div>
            </div>

            {/* Event type legend */}
            <div className="absolute top-4 right-4 terminal-window p-4">
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="text-green-400 text-sm">Legend</span>
                </div>
                <div className="p-2 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <span>Upcoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                        <span>Live</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
