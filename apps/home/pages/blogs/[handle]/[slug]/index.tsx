import { FC } from 'react';

import { getArticleByHandleQuery } from '@shopify/graphql-queries';
import { storefront } from '@shopify/utilities';
import { ArticleResponseModel } from '@shopify/models';
import { GetServerSideProps } from 'next';
import { Container } from '@shopify/components';

type ArticleType = {
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
  content: string;
};

type Props = {
  article: ArticleType;
};

const Article: FC<Props> = ({ article }: Props) => {
  const date = new Date(article?.publishedAt);
  const generatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  return (
    <div className="relative">
      <div className="max-w-1432 mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Testimonial card*/}
            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={article?.image.url}
                alt={article?.image.altText}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="sm:pt-16 lg:pt-20">
            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
              On a mission to empower teams
            </h2>
            <div className="mt-6 ">
              <span className="text-sm font-medium text-gray-900">
                {article?.authorV2.name}
              </span>
              <div className=" text-gray-500">{generatedDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-1432 mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="mt-6 text-gray-500 space-y-6 leading-9 text-justify">
          {article?.content}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.query.handle as string;
  const slug = context.query.slug as string;

  const articleResponse = await storefront<ArticleResponseModel>(
    getArticleByHandleQuery(handle, slug)
  );
  const article = articleResponse.data.blog.articleByHandle;

  return {
    props: {
      article,
    },
  };
};

export default Article;
