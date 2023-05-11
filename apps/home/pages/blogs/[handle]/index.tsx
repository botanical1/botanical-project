import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { getBlogArticlesByHandleQuery } from '@shopify/graphql-queries';
import { storefront } from '@shopify/utilities';
import { BlogArticlesResponseModel } from '@shopify/models';
import Link from 'next/link';

type ArticleType = {
  node: {
    handle: string;
    title: string;
    id: string;
    publishedAt: string;
    image: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
    authorV2: {
      name: string;
    };
  };
};

type Props = {
  articles: ArticleType[];
};

const BlogArticles: FC<Props> = ({ articles }: Props) => {
  const router = useRouter();
  const handle = router.query.handle as string;

  return (
    <div className=" max-w-1432 mx-auto py-12">
      <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center">
        Articles
      </h2>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {articles?.map((item: ArticleType) => {
          const article = item.node;
          const date = new Date(article.publishedAt);
          const generatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          return (
            <Link href={`/blogs/${handle}/${article.handle}`} key={article.id}>
              <a className="flex flex-col rounded-lg border border-stone-200 overflow-hidden cursor-pointer">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={article.image.url}
                    alt={article.image.altText}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <span className="text-xl font-semibold text-gray-900 mt-2">
                    {article.title}
                  </span>
                  <div className="mt-6">
                    <span className="text-sm font-medium text-gray-900">
                      {article.authorV2.name}
                    </span>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      {generatedDate}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.query.handle as string;

  const blogArticlesResponse = await storefront<BlogArticlesResponseModel>(
    getBlogArticlesByHandleQuery(handle)
  );
  const articles = blogArticlesResponse.data.blog.articles.edges;

  return {
    props: {
      articles,
    },
  };
};

export default BlogArticles;
