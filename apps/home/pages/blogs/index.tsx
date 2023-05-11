import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { blogsQuery } from '@shopify/graphql-queries';
import { BlogsResponseModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import Link from 'next/link';

type BlogType = {
  node: {
    title: string;
    handle: string;
  };
};

type BlogsType = BlogType[];

type Props = {
  blogs: BlogsType;
};

const Blogs: FC<Props> = ({ blogs }: Props) => {
  const router = useRouter();

  return (
    <div className="max-w-1432 mx-auto py-12">
      <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center">
        Blogs
      </h2>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {blogs.map((item: BlogType) => {
          const blog = item.node;
          return (
            <Link href={`/blogs/${blog.handle}`} key={blog.title}>
              <a className="rounded-lg block shadow-lg overflow-hidden bg-white p-5 text-xl font-semibold text-gray-900 cursor-pointer">
                <span>{blog.title}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blogsResponse = await storefront<BlogsResponseModel>(blogsQuery);

  const blogs = blogsResponse.data.blogs.edges;

  return {
    props: {
      blogs,
    },
  };
};

export default Blogs;
