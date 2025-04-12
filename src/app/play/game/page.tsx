'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Game state
  const playerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 20,
    color: '#5076ab'
  });

  const objectsRef = useRef([
    { x: 100, y: 100, vx: 0, vy: 0, size: 15, color: '#b75c5a' },
    { x: 200, y: 150, vx: 0, vy: 0, size: 15, color: '#b75c5a' },
    { x: 300, y: 200, vx: 0, vy: 0, size: 15, color: '#b75c5a' },
    { x: 400, y: 250, vx: 0, vy: 0, size: 15, color: '#b75c5a' },
  ]);

  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Handle key events
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        keysRef.current[e.key as keyof typeof keysRef.current] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        keysRef.current[e.key as keyof typeof keysRef.current] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateGameSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      playerRef.current.x = canvas.width / 2;
      playerRef.current.y = canvas.height / 2;
    };

    updateGameSize();
    window.addEventListener('resize', updateGameSize);

    let animationId: number;

    const updateGame = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(75, 123, 179, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update player movement based on keys
      const player = playerRef.current;
      const speed = 0.5;

      if (keysRef.current.ArrowUp || keysRef.current.w) {
        player.vy -= speed;
      }
      if (keysRef.current.ArrowDown || keysRef.current.s) {
        player.vy += speed;
      }
      if (keysRef.current.ArrowLeft || keysRef.current.a) {
        player.vx -= speed;
      }
      if (keysRef.current.ArrowRight || keysRef.current.d) {
        player.vx += speed;
      }

      // Apply friction
      player.vx *= 0.95;
      player.vy *= 0.95;

      // Update player position
      player.x += player.vx;
      player.y += player.vy;

      // Keep player in bounds
      if (player.x < player.size) player.x = player.size;
      if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
      if (player.y < player.size) player.y = player.size;
      if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;

      // Draw player
      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw objects
      const objects = objectsRef.current;
      for (const obj of objects) {
        // Check for collision with player
        const dx = player.x - obj.x;
        const dy = player.y - obj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.size + obj.size) {
          // Push the object away from player
          const angle = Math.atan2(dy, dx);
          const pushForce = 2;
          obj.vx = Math.cos(angle) * pushForce;
          obj.vy = Math.sin(angle) * pushForce;
        }

        // Apply friction and gravity
        obj.vx *= 0.98;
        obj.vy *= 0.98;
        obj.vy += 0.05; // gravity

        // Update object position
        obj.x += obj.vx;
        obj.y += obj.vy;

        // Handle wall collisions
        if (obj.x < obj.size) {
          obj.x = obj.size;
          obj.vx = -obj.vx * 0.8;
        }
        if (obj.x > canvas.width - obj.size) {
          obj.x = canvas.width - obj.size;
          obj.vx = -obj.vx * 0.8;
        }
        if (obj.y < obj.size) {
          obj.y = obj.size;
          obj.vy = -obj.vy * 0.8;
        }
        if (obj.y > canvas.height - obj.size) {
          obj.y = canvas.height - obj.size;
          obj.vy = -obj.vy * 0.8;
        }

        // Draw the object
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Display controls
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 80);
      ctx.fillStyle = 'white';
      ctx.font = '12px Bai Jamjuree';
      ctx.fillText('Controls:', 20, 30);
      ctx.fillText('WASD / Arrow Keys: Move', 20, 50);
      ctx.fillText('Collide with red balls to push them', 20, 70);

      animationId = requestAnimationFrame(updateGame);
    };

    animationId = requestAnimationFrame(updateGame);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateGameSize);
    };
  }, [isPlaying]);

  return (
    <main className="min-h-screen flex flex-col bg-black">
      <header className="w-full flex justify-between items-center p-2 bg-black/80 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Link href="/play">
            <Button variant="outline" size="sm">
              Back to Lobby
            </Button>
          </Link>
          <h1 className="text-white font-semibold">BMGO's Room</h1>
        </div>
        <div>
          <span className="text-xs text-gray-400 mr-2">Players: 1/8</span>
          <span className="text-xs text-gray-400">Mode: Practice</span>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col z-10 bg-black/80">
            <h2 className="text-white text-2xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-gray-300 mb-6 max-w-md text-center">
              This is a simple physics demo showing how hitbox.io's basic mechanics work.
              Use WASD or arrow keys to move and collide with objects.
            </p>
            <Button onClick={() => setIsPlaying(true)} className="game-button">
              Start Game
            </Button>
          </div>
        ) : null}

        <canvas
          ref={canvasRef}
          className="w-full h-full bg-gradient-to-b from-[#332f59] via-[#6a365c] to-[#b75c5a]"
        />
      </div>

      <footer className="w-full flex justify-between items-center p-2 bg-black/80 border-t border-gray-800">
        <div>
          <span className="text-xs text-white/70">Press ESC to open menu</span>
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={() => setIsPlaying(false)}>
            Exit Game
          </Button>
        </div>
      </footer>
    </main>
  );
}
