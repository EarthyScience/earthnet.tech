// Adapted from https://github.com/vercel/examples/tree/main/solutions/blog MIT License
import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/utils/utilsBlog'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div className='max-w-6xl mx-auto px-6 py-2 space-y-8'>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-1"
            href={post.metadata.href || `/blog/${post.slug}`}
            target={post.metadata.href ? "_blank" : undefined}
            rel={post.metadata.href ? "noopener noreferrer" : undefined}
          >
            <div className="w-full flex flex-col md:flex-row">
  <p className="text-neutral-600 dark:text-neutral-400 md:w-[180px] md:flex-shrink-0 md:mr-4">
    {formatDate(post.metadata.publishedAt, false)}
  </p>
  <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
    {post.metadata.title}
  </p>
</div>
          </Link>
        ))
        }
    </div>
  )
}
