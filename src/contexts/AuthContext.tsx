import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Test accounts
const TEST_ACCOUNTS: Record<string, { password: string; name: string }> = {
  'demo@example.com': { password: 'password123', name: 'Demo User' },
  'test@user.com': { password: 'testpass', name: 'Test User' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check localStorage for persisted auth
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const account = TEST_ACCOUNTS[email]
    if (account && account.password === password) {
      const newUser = { email, name: account.name }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      return true
    }
    return false
  }

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if email already exists
    if (TEST_ACCOUNTS[email]) {
      return false
    }

    // Create new account
    const newUser = { email, name }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    TEST_ACCOUNTS[email] = { password, name }
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

