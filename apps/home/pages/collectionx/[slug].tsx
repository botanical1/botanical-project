import {
  Breadcrumb,
  Dropdown,
  RadioGroup,
  Switch,
  TextBox,
} from '@shopify/components';
import { getCollectionByHandleQuery } from '@shopify/graphql-queries';
import { SingleCollectionModel, SingleProductModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import ProductCard from 'libs/components/src/product-card';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Accordion, Button } from 'flowbite-react';
import { FilterIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { BrowserView, MobileView } from 'react-device-detect';

type sortTypes =
  | 'manual'
  | 'best-selling'
  | 'title-ascending'
  | 'title-descending'
  | 'price-ascending'
  | 'price-descending'
  | 'created-ascending'
  | 'created-descending';

interface Props {
  collection: SingleCollectionModel;
  filters: {
    availability: boolean;
    sort_by: sortTypes;
    price_min: number;
    price_max: number;
  };
  meta: {
    total_products: number;
    in_stock: number;
    out_of_stock: number;
    min_price: number;
    max_price: number;
  };
}

const Collection: FC<Props> = ({
  collection: drivedCollection,
  filters: initialFilters,
  meta,
}) => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const collection = drivedCollection.data?.collection;

  if (!collection) return <div>Error Fetching Collection</div>;

  const breadcrumbList = [
    { name: 'Collection', href: '/collections', current: false },
    {
      name: collection.title,
      href: `/collections/${collection.handle}`,
      current: true,
    },
  ];

  const [filters, setFilters] = useState(initialFilters);

  const modifyFilters = (key: string, value: string | number | boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  const modifyUrl = () => {
    const newFilters = {
      ...router.query,
      availability: filters.availability,
      ...(filters.sort_by !== 'manual' && { sort_by: filters.sort_by }),
      ...(filters.price_min > 0 && { price_min: filters.price_min }),
      ...(filters.price_max > 0 && { price_max: filters.price_max }),
    };
    router.push(
      {
        href: router.route,
        query: newFilters,
      },
      null,
      {
        scroll: false,
      }
    );
  };

  const renderFilterBox = () => (
    <div>
      <div className="mb-10 border-b pb-10">
        <p className="mb-5">Availability</p>
        <Switch
          title="In-Stock Products Only"
          subtitle={`(${meta.in_stock})`}
          defaultChecked={initialFilters.availability}
          checked={filters.availability}
          onChange={(value) => {
            modifyFilters('availability', value);
          }}
        />
      </div>
      <div className="mb-10 border-b pb-10">
        <p className="mb-5">Sort by</p>

        <RadioGroup
          onChange={(value) => {
            modifyFilters('sort_by', value.key);
          }}
          groupName="sort-by"
          checkedByDefault={initialFilters.sort_by}
          items={[
            { key: 'manual', value: 'Featured' },
            { key: 'best-selling', value: 'Alphabetically, A-Z' },
            { key: 'title-ascending', value: 'Alphabetically, A-Z' },
            { key: 'title-descending', value: 'Alphabetically, Z-A' },
            { key: 'price-ascending', value: 'Price, low to high' },
            { key: 'price-descending', value: 'Price, high to low' },
            { key: 'created-ascending', value: 'Date, old to new' },
            { key: 'created-descending', value: 'Date, new to old' },
          ]}
        />
      </div>

      <div className="mb-10 border-b pb-10">
        <p className="mb-5">Price</p>

        <TextBox
          name="From"
          placeholder={meta.min_price.toString()}
          defaultValue={filters.price_min > -1 && filters.price_min.toString()}
          type="number"
          onChange={(value) => modifyFilters('price_min', +value)}
        />
        <TextBox
          name="To"
          placeholder={meta.max_price.toString()}
          defaultValue={filters.price_max > -1 && filters.price_max.toString()}
          type="number"
          onChange={(value) => modifyFilters('price_max', +value)}
          extraClasses="mt-8"
        />
      </div>

      <div className="mb-10 pb-10">
        <Button
          pill
          color="dark"
          onClick={() => {
            modifyUrl();
          }}
        >
          <FilterIcon width={15} className="mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const renderProducts = () =>
    collection.products.nodes.map((p) => (
      <ProductCard key={p.id} product={p} />
    ));

  return (
    <div>
      <Head>
        <title>{collection.title} | Yas Natural Solutions</title>
      </Head>
      <div className="mx-auto py-16 sm:py-24 md:max-w-1432">
        <h1 className="text-3xl">{collection.title}</h1>
        <Breadcrumb list={breadcrumbList} />

        <hr className="mt-10 mb-10" />

        <div className="md:grid md:grid-cols-12 md:gap-5">
          <div className="col-span-3 hidden md:block lg:block">
            <BrowserView>{renderFilterBox()}</BrowserView>
          </div>
          <MobileView>
            <div className="col-span-3 md:hidden lg:hidden mb-5">
              <div
                data-accordion="collapse"
                id="accordion-color"
                data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
              >
                <h2 id="accordion-color-heading-1">
                  <button
                    onClick={() => {
                      setShowFilters(!showFilters);
                    }}
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-md focus:ring-0 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                    data-accordion-target="#accordion-color-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-color-body-1"
                  >
                    <span>Filters</span>
                    <svg
                      data-accordion-icon
                      className="w-6 h-6 rotate-180 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-color-body-1"
                  className={classNames(!showFilters ? 'hidden' : '')}
                  aria-labelledby="accordion-color-heading-1"
                >
                  <div className="p-5 font-light border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    {renderFilterBox()}
                  </div>
                </div>
              </div>
            </div>
          </MobileView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 col-span-9">
            {renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const slug = context.params.slug;

  const query = context.query;

  const filters = {
    availability: query.availability ? query.availability === 'true' : true,
    sort_by: query.sort_by ? (query.sort_by as sortTypes) : 'manual',
    price_min: query.price_min ? +query.price_min : -1,
    price_max: query.price_max ? +query.price_max : -1,
  };

  const collection = await storefront<SingleCollectionModel>(
    getCollectionByHandleQuery(slug as string, filters)
  );

  const products = collection?.data?.collection.products.nodes ?? [];
  let MAX_PRICE = 0;
  let availableProducts = 0;
  const totalProducts = products?.length;

  products.forEach((p) => {
    if (+p.priceRange.maxVariantPrice.amount > MAX_PRICE)
      MAX_PRICE = +p.priceRange.maxVariantPrice.amount;

    if (p.availableForSale) availableProducts += 1;
  });

  return {
    props: {
      collection,
      filters,
      meta: {
        total_products: totalProducts,
        in_stock: availableProducts,
        out_of_stock: totalProducts - availableProducts,
        min_price: 0,
        max_price: MAX_PRICE,
      },
    },
  } as any;
};

export default Collection;
