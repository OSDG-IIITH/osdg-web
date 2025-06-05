'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Member {
    id: number;
    name: string;
    role: string;
    techStack: string[];
}

interface NetworkVisualizationProps {
    members: Member[];
}

export function NetworkVisualization({ members }: NetworkVisualizationProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const nodesRef = useRef<THREE.Group>();
    const [isLoaded, setIsLoaded] = useState(false);

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
        camera.position.z = 15;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        // Create network nodes
        const nodeGroup = new THREE.Group();
        nodesRef.current = nodeGroup;
        scene.add(nodeGroup);

        // Node geometry and materials
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 12);
        const nodeMaterials = [
            new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8 }),
            new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.8 }),
            new THREE.MeshBasicMaterial({ color: 0xff0080, transparent: true, opacity: 0.8 }),
        ];

        // Create nodes for each member
        const nodes: THREE.Mesh[] = [];
        members.forEach((member, index) => {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterials[index % 3]);

            // Position nodes in a 3D space
            const angle = (index / members.length) * Math.PI * 2;
            const radius = 5 + Math.random() * 3;
            const height = (Math.random() - 0.5) * 4;

            node.position.x = Math.cos(angle) * radius;
            node.position.y = height;
            node.position.z = Math.sin(angle) * radius;

            node.userData = { member, originalPosition: node.position.clone() };
            nodeGroup.add(node);
            nodes.push(node);
        });

        // Create connections between nodes
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.3
        });

        nodes.forEach((node1, i) => {
            nodes.forEach((node2, j) => {
                if (i < j) {
                    // Create connection based on shared tech stack
                    const member1 = node1.userData.member;
                    const member2 = node2.userData.member; const sharedTech = member1.techStack.filter((tech: string) =>
                        member2.techStack.includes(tech)
                    );

                    if (sharedTech.length > 0) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            node1.position,
                            node2.position
                        ]);
                        const line = new THREE.Line(geometry, connectionMaterial);
                        nodeGroup.add(line);
                    }
                }
            });
        });

        // Add floating particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00cc00,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Rotate the network
            if (nodeGroup) {
                nodeGroup.rotation.y += 0.005;
                nodeGroup.rotation.x += 0.002;
            }

            // Animate particles
            if (particles) {
                particles.rotation.y += 0.001;
                particles.rotation.x += 0.001;
            }

            // Animate node pulsing
            nodes.forEach((node, index) => {
                const time = Date.now() * 0.001;
                const scale = 1 + Math.sin(time * 2 + index) * 0.2;
                node.scale.setScalar(scale);
            });

            renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        const onMouseMove = (event: MouseEvent) => {
            const rect = mountRef.current?.getBoundingClientRect();
            if (!rect) return;

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(nodes);

            // Reset all nodes
            nodes.forEach(node => {
                node.scale.setScalar(1);
                if (node.material instanceof THREE.MeshBasicMaterial) {
                    node.material.opacity = 0.8;
                }
            });

            // Highlight hovered node
            if (intersects.length > 0) {
                const hoveredNode = intersects[0].object as THREE.Mesh;
                hoveredNode.scale.setScalar(1.5);
                if (hoveredNode.material instanceof THREE.MeshBasicMaterial) {
                    hoveredNode.material.opacity = 1;
                }
            }
        };

        mountRef.current.addEventListener('mousemove', onMouseMove);

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current || !camera || !renderer) return;

            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            if (mountRef.current) {
                mountRef.current.removeEventListener('mousemove', onMouseMove);
            }
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [members]);

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-mono text-[#00ff00] glitch-text">
                    &gt; NETWORK_TOPOLOGY.3D
                </h2>
                <div className="font-mono text-sm text-[#00d4ff]">
                    {isLoaded ? '● CONNECTED' : '○ LOADING...'}
                </div>
            </div>

            <div className="bg-black/60 border border-[#00ff00]/30 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="p-4 border-b border-[#00ff00]/20">
                    <div className="font-mono text-xs text-[#00cc00]/70 space-y-1">
                        <div>$ netstat -an | grep ESTABLISHED</div>                        <div className="text-[#00d4ff]">{`> ${members.length} active_nodes detected`}</div>
                        <div className="text-[#00ff00]">{`> collaboration_graph rendered`}</div>
                        <div className="text-[#ff0080]">{`> tech_stack_connections mapped`}</div>
                    </div>
                </div>

                <div
                    ref={mountRef}
                    className="w-full h-[400px] relative cursor-pointer"
                    style={{ background: 'linear-gradient(45deg, #0a0a0a 0%, #001100 100%)' }}
                >
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-[#00ff00] font-mono animate-pulse">
                                Initializing 3D network...
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-[#00ff00]/20">
                    <div className="flex items-center justify-between text-xs font-mono">
                        <div className="text-[#00cc00]/70">
                            Hover nodes to highlight connections
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00ff00]"></div>
                                <span className="text-[#00cc00]/70">Developers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00d4ff]"></div>
                                <span className="text-[#00cc00]/70">Engineers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#ff0080]"></div>
                                <span className="text-[#00cc00]/70">Architects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}