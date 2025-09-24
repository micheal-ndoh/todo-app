import Link from 'next/link'

export default function About() {
  return (
    <main className="mx-auto mt-10 flex min-h-screen max-w-3xl flex-col items-center justify-center rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur sm:p-16 md:p-24 dark:bg-secondary-900/60">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight primary-text drop-shadow-lg">About This Todo App</h1>
      <p className="mb-6 max-w-2xl text-lg text-secondary-700 dark:text-secondary-200">
        A fast and minimalist task manager built with Next.js 15 and Tailwind v4. Add tasks,
        edit inline, mark as complete, and filter your list. Your todos are saved in your browser automatically.
      </p>
      <ul className="mb-8 w-full max-w-2xl text-left text-secondary-700 dark:text-secondary-200">
        <li className="mb-2">• Edit and inline save</li>
        <li className="mb-2">• Filters for All / Active / Completed</li>
        <li className="mb-2">• LocalStorage persistence</li>
        <li className="mb-2">• Light/Dark theme toggle</li>
      </ul>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/todo" className="primary-bg rounded px-8 py-3 text-lg font-semibold shadow transition hover:bg-primary-500/90">
          Open Todo App
        </Link>
        <Link href="/" className="rounded px-8 py-3 text-lg shadow bg-secondary-100 text-secondary-800 transition hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700">
          Back to Home
        </Link>
      </div>
    </main>
  )
}