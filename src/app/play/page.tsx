import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function PlayPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Game header */}
      <header className="w-full flex justify-between items-center p-2 bg-black/80 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="w-36 h-10 relative">
            <Image
              src="/graphics/ui/hitbox.svg"
              alt="hitbox.io"
              fill
              className="object-contain hitbox-logo"
            />
          </div>
          <Tabs defaultValue="play" className="w-auto">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="play" className="text-sm">Play</TabsTrigger>
              <TabsTrigger value="inventory" className="text-sm">Inventory</TabsTrigger>
              <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-300">Guest_192831</span>
          <Button variant="outline" size="sm" className="text-xs">
            Log Out
          </Button>
        </div>
      </header>

      {/* Game content */}
      <div className="flex-1 flex">
        {/* Game sidebar */}
        <div className="w-64 bg-gray-900 p-4 border-r border-gray-800 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Game Browser</h2>

          <div className="space-y-2 mb-4">
            <Link href="/play/game">
              <Button className="w-full game-button text-sm">Create Game</Button>
            </Link>
            <Link href="/play/game">
              <Button variant="outline" className="w-full text-sm">Quick Play</Button>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            <div className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">BMGO's Room</span>
                <span className="text-xs bg-green-700 px-2 py-0.5 rounded-full">4/8</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Lives - Push - Bat</div>
            </div>

            <div className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">Rocket Party</span>
                <span className="text-xs bg-green-700 px-2 py-0.5 rounded-full">2/8</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">1 Life - Push - Rockets</div>
            </div>

            <div className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">Dash Practice</span>
                <span className="text-xs bg-red-700 px-2 py-0.5 rounded-full">8/8</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Kills - Dash - Push</div>
            </div>

            <div className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">Newbie Friendly</span>
                <span className="text-xs bg-green-700 px-2 py-0.5 rounded-full">3/6</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Lives - Push Only</div>
            </div>
          </div>
        </div>

        {/* Game preview */}
        <div
          className="flex-1 retro-grid retro-sunset flex flex-col"
          style={{
            backgroundImage: `url('/graphics/ui/bh4.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Game selection message */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-black/70 p-6 rounded-md max-w-md text-center">
              <h3 className="text-xl font-semibold mb-2">Welcome to hitbox.io</h3>
              <p className="text-sm text-gray-300 mb-4">
                Join a game from the browser or create your own game room.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/play/game">
                  <Button className="game-button">Create Game</Button>
                </Link>
                <Link href="/play/game">
                  <Button variant="outline">Quick Play</Button>
                </Link>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                <h4 className="font-semibold mb-1">Controls:</h4>
                <p>WASD or Arrow Keys - Move</p>
                <p>Left Click - Force Push</p>
                <p>Right Click - Bat</p>
                <p>Shift - Rocket</p>
              </div>
            </div>
          </div>

          {/* Game chat */}
          <div className="h-32 bg-black/80 border-t border-gray-800 p-2 flex flex-col">
            <div className="flex-1 overflow-y-auto text-xs space-y-1 mb-2">
              <div>
                <span className="text-blue-300">System:</span>
                <span className="text-gray-300"> Welcome to hitbox.io! Join a game to start playing.</span>
              </div>
              <div>
                <span className="text-green-300">BMGO735:</span>
                <span className="text-gray-300"> anyone want to join my room for some lives?</span>
              </div>
              <div>
                <span className="text-red-300">da_gamersigma:</span>
                <span className="text-gray-300"> rocket party is fun, join us!</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
