'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface GameState {
    score: number;
    level: number;
    lives: number;
    isPlaying: boolean;
    isPaused: boolean;
    gameOver: boolean;
    commits: number;
    bugs: number;
}

interface Player {
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    speed: number;
}

interface Collectible {
    mesh: THREE.Mesh;
    type: 'commit' | 'bug' | 'powerup';
    collected: boolean;
    rotationSpeed: number;
}

export default function CodeQuestGame() {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const playerRef = useRef<Player>();
    const collectiblesRef = useRef<Collectible[]>([]);
    const mazeRef = useRef<THREE.Group>();
    const keysRef = useRef<{ [key: string]: boolean }>({});
    const animationIdRef = useRef<number>();

    const [gameState, setGameState] = useState<GameState>({
        score: 0,
        level: 1,
        lives: 3,
        isPlaying: false,
        isPaused: false,
        gameOver: false,
        commits: 0,
        bugs: 0
    });

    // Initialize Three.js scene
    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 15, 15);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00ff00, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Neon lights
        const neonLight1 = new THREE.PointLight(0x00d4ff, 1, 10);
        neonLight1.position.set(-10, 5, -10);
        scene.add(neonLight1);

        const neonLight2 = new THREE.PointLight(0xff0080, 1, 10);
        neonLight2.position.set(10, 5, 10);
        scene.add(neonLight2);

        // Initialize game
        initializeGame();

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            keysRef.current[event.code] = true;

            // Game controls
            if (event.code === 'Space') {
                event.preventDefault();
                if (!gameState.isPlaying && !gameState.gameOver) {
                    startGame();
                } else if (gameState.isPlaying) {
                    togglePause();
                }
            }

            if (event.code === 'KeyR' && gameState.gameOver) {
                resetGame();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            keysRef.current[event.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameState]);

    const initializeGame = () => {
        if (!sceneRef.current) return;

        createMaze();
        createPlayer();
        createCollectibles();
    };

    const createMaze = () => {
        if (!sceneRef.current) return;

        const mazeGroup = new THREE.Group();
        mazeRef.current = mazeGroup;

        // Maze dimensions
        const mazeSize = 20;
        const wallHeight = 3;
        const wallThickness = 0.5;

        // Wall material with glowing effect
        const wallMaterial = new THREE.MeshPhongMaterial({
            color: 0x003300,
            emissive: 0x001100,
            transparent: true,
            opacity: 0.8
        });

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(mazeSize, mazeSize);
        const floorMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0.5
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        mazeGroup.add(floor);

        // Create maze walls (simple pattern)
        const wallPositions = [
            // Outer walls
            { x: 0, z: mazeSize / 2, width: mazeSize, height: wallThickness },
            { x: 0, z: -mazeSize / 2, width: mazeSize, height: wallThickness },
            { x: mazeSize / 2, z: 0, width: wallThickness, height: mazeSize },
            { x: -mazeSize / 2, z: 0, width: wallThickness, height: mazeSize },

            // Inner walls
            { x: -5, z: 0, width: wallThickness, height: 8 },
            { x: 5, z: 0, width: wallThickness, height: 8 },
            { x: 0, z: -5, width: 8, height: wallThickness },
            { x: 0, z: 5, width: 8, height: wallThickness },
            { x: -7, z: -7, width: 6, height: wallThickness },
            { x: 7, z: 7, width: 6, height: wallThickness },
        ];

        wallPositions.forEach(wall => {
            const wallGeometry = new THREE.BoxGeometry(wall.width, wallHeight, wall.height);
            const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
            wallMesh.position.set(wall.x, wallHeight / 2, wall.z);
            wallMesh.castShadow = true;
            mazeGroup.add(wallMesh);
        });

        sceneRef.current.add(mazeGroup);
    }; const createPlayer = () => {
        if (!sceneRef.current) return;

        // Player geometry - glowing cube
        const playerGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const playerMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x0088cc,
            transparent: true,
            opacity: 0.9
        });

        const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
        playerMesh.position.set(0, 0.4, 0);
        playerMesh.castShadow = true;

        // Add wireframe overlay
        const wireframeGeometry = new THREE.EdgesGeometry(playerGeometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        playerMesh.add(wireframe);

        playerRef.current = {
            mesh: playerMesh,
            position: new THREE.Vector3(0, 0.4, 0),
            velocity: new THREE.Vector3(0, 0, 0),
            speed: 5
        };

        sceneRef.current.add(playerMesh);
    };

    const createCollectibles = () => {
        if (!sceneRef.current) return;

        collectiblesRef.current = [];

        // Commit collectibles (green cubes)
        const commitPositions = [
            { x: -8, z: -8 }, { x: 8, z: 8 }, { x: -8, z: 8 }, { x: 8, z: -8 },
            { x: -3, z: -8 }, { x: 3, z: 8 }, { x: -8, z: 3 }, { x: 8, z: -3 }
        ];

        commitPositions.forEach(pos => {
            const commitGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const commitMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff00,
                emissive: 0x008800,
                transparent: true,
                opacity: 0.8
            });

            const commitMesh = new THREE.Mesh(commitGeometry, commitMaterial);
            commitMesh.position.set(pos.x, 1, pos.z);            // Add glow effect
            const glowGeometry = new THREE.SphereGeometry(0.8, 16, 16);
            const glowMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.2
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            commitMesh.add(glow);

            // Add wireframe for hacker aesthetic
            const wireframeGeometry = new THREE.EdgesGeometry(commitGeometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            commitMesh.add(wireframe);

            // Add floating animation data
            commitMesh.userData = { originalY: 1, floatOffset: Math.random() * Math.PI * 2 }; collectiblesRef.current.push({
                mesh: commitMesh,
                type: 'commit',
                collected: false,
                rotationSpeed: 0.02
            });

            if (sceneRef.current) {
                sceneRef.current.add(commitMesh);
            }
        });

        // Bug collectibles (red glitching cubes)
        const bugPositions = [
            { x: -2, z: -2 }, { x: 2, z: 2 }, { x: -6, z: 6 }, { x: 6, z: -6 }
        ];

        bugPositions.forEach(pos => {
            const bugGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
            const bugMaterial = new THREE.MeshPhongMaterial({
                color: 0xff3333,
                emissive: 0x880000,
                transparent: true,
                opacity: 0.9
            }); const bugMesh = new THREE.Mesh(bugGeometry, bugMaterial);
            bugMesh.position.set(pos.x, 1, pos.z);

            // Add glitch wireframe
            const wireframeGeometry = new THREE.EdgesGeometry(bugGeometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            bugMesh.add(wireframe);

            // Add glitch animation data
            bugMesh.userData = {
                originalY: 1,
                glitchOffset: Math.random() * Math.PI * 2,
                originalPosition: { x: pos.x, z: pos.z }
            }; collectiblesRef.current.push({
                mesh: bugMesh,
                type: 'bug',
                collected: false,
                rotationSpeed: 0.05
            });

            if (sceneRef.current) {
                sceneRef.current.add(bugMesh);
            }
        });
    };

    const startGame = () => {
        setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
        gameLoop();
    };

    const togglePause = () => {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    };

    const resetGame = () => {
        setGameState({
            score: 0,
            level: 1,
            lives: 3,
            isPlaying: false,
            isPaused: false,
            gameOver: false,
            commits: 0,
            bugs: 0
        });

        // Reset player position
        if (playerRef.current) {
            playerRef.current.position.set(0, 0.4, 0);
            playerRef.current.mesh.position.copy(playerRef.current.position);
        }

        // Reset collectibles
        collectiblesRef.current.forEach(collectible => {
            collectible.collected = false;
            collectible.mesh.visible = true;
        });
    };

    const updatePlayer = (deltaTime: number) => {
        if (!playerRef.current || gameState.isPaused) return;

        const player = playerRef.current;
        const moveSpeed = player.speed * deltaTime;

        // Handle input
        if (keysRef.current['KeyW'] || keysRef.current['ArrowUp']) {
            player.velocity.z = -moveSpeed;
        } else if (keysRef.current['KeyS'] || keysRef.current['ArrowDown']) {
            player.velocity.z = moveSpeed;
        } else {
            player.velocity.z = 0;
        }

        if (keysRef.current['KeyA'] || keysRef.current['ArrowLeft']) {
            player.velocity.x = -moveSpeed;
        } else if (keysRef.current['KeyD'] || keysRef.current['ArrowRight']) {
            player.velocity.x = moveSpeed;
        } else {
            player.velocity.x = 0;
        }

        // Update position with boundary checking
        const newX = player.position.x + player.velocity.x;
        const newZ = player.position.z + player.velocity.z;

        // Simple boundary checking (maze bounds)
        if (Math.abs(newX) < 9.5) player.position.x = newX;
        if (Math.abs(newZ) < 9.5) player.position.z = newZ;

        player.mesh.position.copy(player.position);

        // Update camera to follow player
        if (cameraRef.current) {
            cameraRef.current.position.x = player.position.x;
            cameraRef.current.position.z = player.position.z + 15;
            cameraRef.current.lookAt(player.position);
        }
    }; const updateCollectibles = (deltaTime: number) => {
        if (!playerRef.current || gameState.isPaused) return;

        const time = Date.now() * 0.001; // Current time in seconds

        collectiblesRef.current.forEach(collectible => {
            if (collectible.collected) return;

            // Rotate collectibles
            collectible.mesh.rotation.y += collectible.rotationSpeed;

            // Animate based on type
            if (collectible.type === 'commit') {
                // Floating animation for commits
                const floatOffset = collectible.mesh.userData.floatOffset || 0;
                collectible.mesh.position.y = collectible.mesh.userData.originalY + Math.sin(time * 2 + floatOffset) * 0.3;
            } else if (collectible.type === 'bug') {
                // Glitch animation for bugs
                const glitchOffset = collectible.mesh.userData.glitchOffset || 0;
                const originalPos = collectible.mesh.userData.originalPosition;

                // Random glitch movement
                if (Math.random() < 0.1) { // 10% chance per frame
                    collectible.mesh.position.x = originalPos.x + (Math.random() - 0.5) * 0.2;
                    collectible.mesh.position.z = originalPos.z + (Math.random() - 0.5) * 0.2;
                } else {
                    // Return to original position
                    collectible.mesh.position.x = originalPos.x;
                    collectible.mesh.position.z = originalPos.z;
                }

                // Vertical glitch
                collectible.mesh.position.y = collectible.mesh.userData.originalY + Math.sin(time * 5 + glitchOffset) * 0.1;

                // Rotation glitch
                collectible.mesh.rotation.x = Math.sin(time * 3 + glitchOffset) * 0.2;
                collectible.mesh.rotation.z = Math.cos(time * 4 + glitchOffset) * 0.2;
            }

            // Check collision with player
            const distance = collectible.mesh.position.distanceTo(playerRef.current!.position);

            if (distance < 1) {
                collectible.collected = true;
                collectible.mesh.visible = false;

                if (collectible.type === 'commit') {
                    setGameState(prev => ({
                        ...prev,
                        score: prev.score + 100,
                        commits: prev.commits + 1
                    }));
                } else if (collectible.type === 'bug') {
                    setGameState(prev => ({
                        ...prev,
                        lives: prev.lives - 1,
                        bugs: prev.bugs + 1
                    }));
                }
            }
        });

        // Check win condition
        const allCommitsCollected = collectiblesRef.current
            .filter(c => c.type === 'commit')
            .every(c => c.collected);

        if (allCommitsCollected) {
            setGameState(prev => ({ ...prev, level: prev.level + 1 }));
            // Could add level progression logic here
        }

        // Check game over condition
        if (gameState.lives <= 0) {
            setGameState(prev => ({ ...prev, gameOver: true, isPlaying: false }));
        }
    };

    const gameLoop = useCallback(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        if (!gameState.isPlaying || gameState.gameOver) return;

        const deltaTime = 0.016; // ~60fps

        updatePlayer(deltaTime);
        updateCollectibles(deltaTime);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationIdRef.current = requestAnimationFrame(gameLoop);
    }, [gameState]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
            gameLoop();
        }
    }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, gameLoop]);

    return (
        <div className="relative w-full h-full min-h-[600px] bg-deep-black border border-matrix-green/30 rounded-lg overflow-hidden">
            {/* Game Canvas */}
            <div ref={mountRef} className="w-full h-full absolute inset-0" />

            {/* HUD */}
            <div className="absolute top-4 left-4 text-matrix-green font-mono text-sm space-y-2 z-10">
                <div className="bg-deep-black/80 p-2 rounded border border-matrix-green/50">
                    <div>Score: {gameState.score}</div>
                    <div>Level: {gameState.level}</div>
                    <div>Lives: {'❤️'.repeat(gameState.lives)}</div>
                    <div>Commits: {gameState.commits}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 text-matrix-green font-mono text-xs z-10">
                <div className="bg-deep-black/80 p-2 rounded border border-matrix-green/50">
                    <div>WASD / Arrow Keys: Move</div>
                    <div>Space: Start/Pause</div>
                    <div>R: Reset (when game over)</div>
                </div>
            </div>

            {/* Game State Overlays */}
            {!gameState.isPlaying && !gameState.gameOver && (
                <div className="absolute inset-0 bg-deep-black/90 flex items-center justify-center z-20">
                    <div className="text-center text-matrix-green font-mono">
                        <h2 className="text-4xl mb-4 animate-pulse">CODE QUEST</h2>
                        <p className="text-lg mb-4">Navigate the 3D maze and collect commits!</p>
                        <p className="text-sm mb-6">Avoid the bugs or lose a life!</p>
                        <button
                            onClick={startGame}
                            className="px-6 py-3 bg-matrix-green/20 border border-matrix-green hover:bg-matrix-green/30 transition-colors"
                        >
                            Press SPACE to Start
                        </button>
                    </div>
                </div>
            )}

            {gameState.isPaused && (
                <div className="absolute inset-0 bg-deep-black/90 flex items-center justify-center z-20">
                    <div className="text-center text-matrix-green font-mono">
                        <h2 className="text-2xl animate-pulse">PAUSED</h2>
                        <p className="mt-2">Press SPACE to resume</p>
                    </div>
                </div>
            )}

            {gameState.gameOver && (
                <div className="absolute inset-0 bg-deep-black/90 flex items-center justify-center z-20">
                    <div className="text-center text-matrix-green font-mono">
                        <h2 className="text-4xl mb-4 text-glitch-red animate-glitch">GAME OVER</h2>
                        <p className="text-lg mb-2">Final Score: {gameState.score}</p>
                        <p className="text-sm mb-6">Commits Collected: {gameState.commits}</p>
                        <button
                            onClick={resetGame}
                            className="px-6 py-3 bg-matrix-green/20 border border-matrix-green hover:bg-matrix-green/30 transition-colors"
                        >
                            Press R to Restart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
