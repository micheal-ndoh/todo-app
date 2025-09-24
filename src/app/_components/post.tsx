import Link from "next/link";

interface PostProps {
  id: number;
  title: string;
  excerpt: string;
}

export default function Post({ id, title, excerpt }: PostProps) {
  return (
    <article className="border-secondary-200 hover:bg-secondary-50/60 rounded-md border-b px-2 pb-6 transition">
      <Link
        href={`/blog/${id}`}
        className="primary-text text-2xl font-semibold hover:underline"
      >
        {title}
      </Link>
      <p className="secondary-text mt-2 text-base leading-relaxed">{excerpt}</p>
    </article>
  );
}
