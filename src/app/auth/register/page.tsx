'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // If already authenticated, redirect to play page
  if (isAuthenticated) {
    router.push('/play');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill out all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(username, password, displayName || username);

      if (success) {
        toast({
          title: 'Success',
          description: 'Account created! You are now logged in.',
        });
        router.push('/play');
      } else {
        toast({
          title: 'Error',
          description: 'Username already exists or an error occurred',
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
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Join Hitbox.io and start playing today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-200">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter a unique username"
                autoComplete="username"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-gray-200">
                Display Name
              </label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="How others will see you (optional)"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Leave blank to use your username
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-gray-500">
                Minimum 6 characters
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full game-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-400">
              Login here
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
