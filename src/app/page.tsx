import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto mt-10 flex min-h-screen max-w-3xl flex-col items-center justify-center rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur sm:p-16 md:p-24 dark:bg-secondary-900/60">
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight primary-text drop-shadow-lg">
        Stay Organized with the Todo App
      </h1>
      <p className="mb-10 max-w-2xl text-balance text-lg text-secondary-700 dark:text-secondary-200">
        Add, edit, complete, and filter your tasks. Your list automatically saves in your browser. Switch themes anytime.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/todo"
          className="primary-bg rounded px-8 py-3 text-lg font-semibold shadow transition hover:bg-primary-500/90"
        >
          Open Todo App
        </Link>
        <Link
          href="/about"
          className="rounded px-8 py-3 text-lg shadow bg-secondary-100 text-secondary-800 transition hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700"
        >
          Learn more
        </Link>
      </div>
    </main>
  );
}
