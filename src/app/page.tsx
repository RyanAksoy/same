import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="w-full flex justify-between items-center p-3 bg-black/50">
        <div className="flex items-center text-sm opacity-70">
          <span>contact: chaz@multiplayer.gg</span>
        </div>
        <div className="flex items-center text-sm opacity-70">
          <span>music: Daydreamer by meganeko</span>
        </div>
      </header>

      {/* Main content - Retro grid with sunset background */}
      <div
        className="flex-1 retro-grid retro-sunset flex items-center justify-center"
        style={{
          backgroundImage: `url('/graphics/ui/bh4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="game-container flex max-w-4xl w-full h-[500px] mx-4 relative overflow-hidden rounded-md">
          <div className="absolute top-0 left-0 w-full text-xs text-yellow-300 bg-black/70 p-1 flex justify-center">
            <div className="inline-flex space-x-2">
              <span>TOP OF THE WEEK:</span>
              <span className="font-semibold">i_broke_my_game</span>
              <span>/</span>
              <span className="font-semibold">Ididurmomdad</span>
              <span>/</span>
              <span className="font-semibold">da_gamersigma</span>
              <span>/</span>
              <span className="font-semibold">BMGO735</span>
              <span>/</span>
              <span className="font-semibold">Aldski</span>
            </div>
          </div>

          {/* Game panels */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-25">
              <div className="w-20 h-20 border-4 border-white rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
            </div>

            <Card className="bg-black/70 w-full max-w-xs p-6 border-none">
              <h3 className="text-xl font-semibold mb-2">Play as Guest</h3>
              <p className="text-sm text-gray-300 mb-4">Play without an account</p>
              <Link href="/play">
                <Button className="game-button w-full">PLAY AS GUEST</Button>
              </Link>
            </Card>
          </div>

          {/* Vertical divider */}
          <div className="vertical-divider" />

          {/* Login panel */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <Card className="bg-black/70 w-full max-w-xs p-6 border-none">
              <h3 className="text-xl font-semibold mb-2">Login or Register</h3>
              <p className="text-sm text-gray-300 mb-4">
                Log in or create a new account here.<br />
                Use your Bonk account if you have one
              </p>
              <Button className="game-button w-full">LOGIN OR REGISTER</Button>
            </Card>
          </div>

          {/* Hitbox logo */}
          <div className="absolute top-5 right-5 w-[200px] h-[80px]">
            <div className="hitbox-logo relative w-full h-full">
              <Image
                src="/graphics/ui/hitbox.svg"
                alt="hitbox.io"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Player username */}
          <div className="absolute bottom-2 right-2 text-sm">
            <span className="text-white/70">IMACRAAZZY</span>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <footer className="w-full flex justify-between items-center p-2 bg-black/80">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <span className="text-white/70">63</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-300 text-xs">Deathball 20XX by IceBruker</span>
          <Button variant="ghost" size="icon" className="text-white/70">
            <span>←</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70">
            <span>→</span>
          </Button>
        </div>
      </footer>
    </main>
  );
}
