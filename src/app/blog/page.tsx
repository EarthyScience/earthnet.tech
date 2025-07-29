import { BlogPosts } from '@/components/posts'

export const metadata = {
  title: 'News',
  description: 'Latest news from EarthNet team.',
}

export default function Page() {
  return (
    <section>
      <h1 className="max-w-6xl mx-auto px-6 mt-8 py-12 font-semibold text-2xl tracking-tighter">News</h1>
      <BlogPosts />
    </section>
  )
}
