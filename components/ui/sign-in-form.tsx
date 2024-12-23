'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/CMS'
  
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              email: e.target.value 
            }))}
            className="w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              password: e.target.value 
            }))}
            className="w-full"
            required
          />
        </div>
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </Card>
  )
}

