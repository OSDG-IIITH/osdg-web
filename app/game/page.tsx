import CodeQuestGame from '@/components/CodeQuestGame';

export default function GamePage() {
    return (
        <div className="min-h-screen bg-deep-black text-matrix-green">
            {/* Header */}
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-mono font-bold mb-4">
                        <span className="text-electric-blue">CODE</span>
                        <span className="text-matrix-green"> QUEST</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Navigate through a 3D maze of code blocks, collect commits (green cubes) to score points,
                        and avoid bugs (red cubes) that will cost you lives. Can you collect all commits and master the maze?
                    </p>
                </div>

                {/* Game Container */}
                <div className="w-full max-w-6xl mx-auto">
                    <div className="aspect-video">
                        <CodeQuestGame />
                    </div>
                </div>

                {/* Game Info */}
                <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-deep-black/50 border border-matrix-green/30 p-4 rounded">
                        <h3 className="text-xl font-mono text-electric-blue mb-2">Objective</h3>
                        <p className="text-sm text-gray-300">
                            Collect all green commit cubes while avoiding red bug cubes.
                            Each commit gives you 100 points, but touching a bug costs a life!
                        </p>
                    </div>

                    <div className="bg-deep-black/50 border border-electric-blue/30 p-4 rounded">
                        <h3 className="text-xl font-mono text-matrix-green mb-2">Controls</h3>
                        <div className="text-sm text-gray-300 space-y-1">
                            <div>• WASD or Arrow Keys: Move</div>
                            <div>• Space: Start/Pause</div>
                            <div>• R: Reset (when game over)</div>
                        </div>
                    </div>

                    <div className="bg-deep-black/50 border border-neon-pink/30 p-4 rounded">
                        <h3 className="text-xl font-mono text-neon-pink mb-2">Features</h3>
                        <div className="text-sm text-gray-300 space-y-1">
                            <div>• 3D maze navigation</div>
                            <div>• Dynamic camera following</div>
                            <div>• Glowing collectibles</div>
                            <div>• Progressive difficulty</div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-mono text-gray-400 mb-2">Built with</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-matrix-green/20 border border-matrix-green/50 rounded">
                            Three.js
                        </span>
                        <span className="px-3 py-1 bg-electric-blue/20 border border-electric-blue/50 rounded">
                            React
                        </span>
                        <span className="px-3 py-1 bg-neon-pink/20 border border-neon-pink/50 rounded">
                            TypeScript
                        </span>
                        <span className="px-3 py-1 bg-terminal-green/20 border border-terminal-green/50 rounded">
                            Next.js
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
