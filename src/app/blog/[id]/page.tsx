import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="mx-auto mt-10 flex min-h-screen max-w-2xl flex-col items-start rounded-lg bg-white/80 p-8 shadow-lg dark:bg-secondary-900/60">
      <h1 className="mb-4 text-3xl font-bold primary-text">Post #{id}</h1>
      <p className="secondary-text">This is a placeholder blog post page.</p>
      <Link href="/blog" className="mt-6 primary-text underline">
        ← Back to Blog
      </Link>
    </main>
  );
}

