import Link from "next/link";
import Post from "../_components/post";

const posts = [
  { id: 1, title: "First Post", excerpt: "This is the first blog post." },
  { id: 2, title: "Second Post", excerpt: "Another exciting post." },
];

export default function Blog() {
  return (
    <main className="mx-auto mt-10 flex min-h-screen max-w-2xl flex-col items-start rounded-lg bg-white/80 p-8 shadow-lg sm:p-16 md:p-24">
      <h1 className="primary-text mb-10 text-5xl font-extrabold tracking-tight drop-shadow-lg">
        Blog
      </h1>
      <div className="w-full space-y-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      <Link
        href="/"
        className="primary-text hover:text-primary-500 mt-10 inline-block text-lg underline transition-colors"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
