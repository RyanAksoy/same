'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, guestLogin, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // If already authenticated, redirect to play page
  if (isAuthenticated) {
    router.push('/play');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both username and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        toast({
          title: 'Success',
          description: 'You have been logged in!',
        });
        router.push('/play');
      } else {
        toast({
          title: 'Error',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    guestLogin();
    router.push('/play');
  };

  return (
    <main
      className="flex-1 retro-grid retro-sunset flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('/graphics/ui/bh4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full max-w-md bg-black/80 border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Login to Hitbox.io
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-200">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your username"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full game-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleGuestLogin}
              className="w-full"
              disabled={isLoading}
            >
              Play as Guest
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-400 text-center">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-400">
              Register here
            </Link>
          </div>
          <div className="text-sm text-gray-400 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-300">
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
