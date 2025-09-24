import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold primary-text mb-8">404 - Page Not Found</h1>
      <p className="text-xl secondary-text mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="primary-bg px-6 py-3 rounded-lg hover:bg-primary-600">
        Go Home
      </Link>
    </main>
  )
}