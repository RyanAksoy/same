'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  stats: {
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
    gamesPlayed: number;
  };
  createdAt: Date;
  preferences: {
    theme: 'dark' | 'light';
    controls: {
      moveUp: string;
      moveDown: string;
      moveLeft: string;
      moveRight: string;
      forcePush: string;
      bat: string;
      rocket: string;
      dash: string;
    };
  };
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  guestLogin: () => void;
  updateProfile: (updatedProfile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration purposes
const MOCK_USERS: Record<string, { password: string; profile: UserProfile }> = {
  'admin': {
    password: 'password123',
    profile: {
      id: '1',
      username: 'admin',
      displayName: 'Admin User',
      avatarUrl: '',
      stats: {
        wins: 25,
        losses: 10,
        kills: 150,
        deaths: 120,
        gamesPlayed: 35,
      },
      createdAt: new Date('2023-01-01'),
      preferences: {
        theme: 'dark',
        controls: {
          moveUp: 'w',
          moveDown: 's',
          moveLeft: 'a',
          moveRight: 'd',
          forcePush: 'mouse1',
          bat: 'mouse2',
          rocket: 'shift',
          dash: 'space',
        },
      },
    },
  },
  'player1': {
    password: 'password123',
    profile: {
      id: '2',
      username: 'player1',
      displayName: 'Pro Gamer',
      avatarUrl: '',
      stats: {
        wins: 42,
        losses: 15,
        kills: 230,
        deaths: 180,
        gamesPlayed: 57,
      },
      createdAt: new Date('2023-02-15'),
      preferences: {
        theme: 'dark',
        controls: {
          moveUp: 'w',
          moveDown: 's',
          moveLeft: 'a',
          moveRight: 'd',
          forcePush: 'mouse1',
          bat: 'mouse2',
          rocket: 'shift',
          dash: 'space',
        },
      },
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on load
  useEffect(() => {
    const savedUser = localStorage.getItem('hitbox_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt),
        });
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('hitbox_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const userRecord = MOCK_USERS[username.toLowerCase()];

    if (userRecord && userRecord.password === password) {
      setUser(userRecord.profile);
      localStorage.setItem('hitbox_user', JSON.stringify(userRecord.profile));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (username: string, password: string, displayName: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if username already exists
    if (MOCK_USERS[username.toLowerCase()]) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: UserProfile = {
      id: Date.now().toString(),
      username: username.toLowerCase(),
      displayName: displayName || username,
      stats: {
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        gamesPlayed: 0,
      },
      createdAt: new Date(),
      preferences: {
        theme: 'dark',
        controls: {
          moveUp: 'w',
          moveDown: 's',
          moveLeft: 'a',
          moveRight: 'd',
          forcePush: 'mouse1',
          bat: 'mouse2',
          rocket: 'shift',
          dash: 'space',
        },
      },
    };

    // Add to mock users (in a real app, this would be an API call)
    MOCK_USERS[username.toLowerCase()] = {
      password,
      profile: newUser,
    };

    // Log in the new user
    setUser(newUser);
    localStorage.setItem('hitbox_user', JSON.stringify(newUser));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hitbox_user');
  };

  const guestLogin = () => {
    const guestId = `guest_${Math.floor(Math.random() * 100000)}`;
    const guestUser: UserProfile = {
      id: guestId,
      username: guestId,
      displayName: `Guest_${guestId.substring(6)}`,
      stats: {
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        gamesPlayed: 0,
      },
      createdAt: new Date(),
      preferences: {
        theme: 'dark',
        controls: {
          moveUp: 'w',
          moveDown: 's',
          moveLeft: 'a',
          moveRight: 'd',
          forcePush: 'mouse1',
          bat: 'mouse2',
          rocket: 'shift',
          dash: 'space',
        },
      },
    };

    setUser(guestUser);
    // We don't save guest users to localStorage
  };

  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    if (!user) return;

    const newProfile = {
      ...user,
      ...updatedProfile,
    };

    setUser(newProfile);

    // Only save to localStorage if it's a registered user
    if (!user.username.startsWith('guest_')) {
      localStorage.setItem('hitbox_user', JSON.stringify(newProfile));

      // Update MOCK_USERS for demonstration purposes
      if (MOCK_USERS[user.username]) {
        MOCK_USERS[user.username].profile = newProfile;
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      guestLogin,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
