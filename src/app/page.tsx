import { Orbitron, Space_Grotesk } from 'next/font/google';
import TypingGame from '@/components/TypingGame';

const orbitron = Orbitron({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#0a0a0f] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white py-8 ${spaceGrotesk.className}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className={`text-6xl font-bold cyber-gradient bg-clip-text text-transparent neon-text ${orbitron.className}`}>
            CYBER TYPE
          </h1>
          <p className="text-cyan-400/80 text-xl">
            Master the Art of Speed Typing
          </p>
          <div className="w-24 h-1 mx-auto cyber-gradient rounded-full mt-4"></div>
        </div>
        
        <div className="glass-panel cyber-border rounded-2xl p-8">
          <TypingGame />
        </div>
      </div>
    </main>
  );
}
