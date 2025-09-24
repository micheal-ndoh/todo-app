'use client'

import { useEffect } from 'react'

interface Props { error: Error; reset: () => void }

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold primary-text mb-8">Something Went Wrong</h1>
      <p className="text-xl secondary-text mb-8">An unexpected error occurred.</p>
      <button onClick={reset} className="primary-bg px-6 py-3 rounded-lg hover:bg-primary-600">
        Try Again
      </button>
    </main>
  )
}