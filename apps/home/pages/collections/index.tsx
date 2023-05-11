import { getCollections } from '@shopify/graphql-queries';
import { CollectionsListModel, CollectionsModel } from '@shopify/models';
import { storefront, truncateString } from '@shopify/utilities';
import Link from 'next/link';
import React, { FC } from 'react';
import Image from 'next/future/image';
import { Breadcrumb } from '@shopify/components';

const wantedCollectionsForDemo = [
  'cbd-face-serum',
  'cbd-body-lotion',
  'hemp-scalp-oil',
];

interface Props {
  collections: CollectionsModel[];
}

const Collections: FC<Props> = ({ collections }) => {
  return (
    <div>
      <div className="max-w-1432 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>
          <Breadcrumb
            list={[
              {
                current: true,
                href: '/collections',
                name: 'Collections',
              },
            ]}
          />

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {collections
              .filter((item) => wantedCollectionsForDemo.includes(item.handle))
              .map((c) => (
                <div
                  key={c.handle}
                  className="relative bg-white rounded-xl shadow-card hover:shadow-cardHover  transition-all duration-300"
                >
                  <div className="relative w-full h-80 bg-white rounded-lg rounded-b-none overflow-hidden">
                    {c.image && (
                      <Image
                        src={c.image.url}
                        alt={c.image.altText}
                        width={300}
                        height={300}
                        className={'w-full h-full object-cover'}
                      />
                    )}
                  </div>
                  <div className="p-6 pt-0">
                    <h3 className="mt-6 font-semibold text-gray-900 mb-2">
                      <Link href={`/collections/${c.handle}`}>
                        <a>
                          <span className="absolute inset-0" />
                          {c.title}
                        </a>
                      </Link>
                    </h3>
                    <div
                      className="text-based text-justify text-sm text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: truncateString(c.descriptionHtml, 180),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const collections = await storefront<CollectionsListModel>(getCollections);

  return {
    props: {
      collections: collections.data.collections.nodes,
    },
    revalidate: 300,
  } as any;
}

export default Collections;
