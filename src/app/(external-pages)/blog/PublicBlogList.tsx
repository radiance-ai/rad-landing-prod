import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import moment from 'moment';

export function PublicBlogList({
  blogPosts,
}: {
  blogPosts: Array<Table<'internal_blog_posts'>>;
}) {
  return (
    <>
      {blogPosts.length ? (
        <div className="space-y-2 mx-4 sm:mx-8 md:mx-0">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-start"
              >
                <div className="relative w-full">
                  <img
                    src={post.cover_image ?? '/images/nextbase-logo.png'}
                    alt={post.title}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100  object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                </div>
                <div className="max-w-xl">
                  <div className="mt-5 flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.created_at}
                      className="text-gray-500 dark:text-slate-300 uppercase"
                    >
                      {moment(post.created_at).format('MMM D, YYYY')}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-slate-50 group-hover:text-gray-600 dark:group:hover:text-slate-200">
                      <a href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-base text-gray-600 dark:text-slate-400">
                      {post.summary}
                    </p>
                  </div>
                  {/* <div className="relative mt-8 flex items-center gap-x-4">
                      <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <T.Subtle className="text-center">No blog posts yet.</T.Subtle>
      )}
    </>
  );
}
