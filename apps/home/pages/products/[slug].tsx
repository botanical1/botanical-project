import { FC, Fragment, useState } from 'react';

import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import { extractHandleFromUrl, storefront } from '@shopify/utilities';
import { getProductByHandleQuery } from '@shopify/graphql-queries';
import { SingleProductModel } from '@shopify/models';
import Image from 'next/future/image';
import { useCartStore } from '@shopify/state';
import Head from 'next/head';
import { Breadcrumb } from '@shopify/components';
import { Spinner } from 'flowbite-react';
import styles from './products.module.css';

const customSpecifications = [
  {
    id: 1,
    title: 'VEGAN',
    img: '/images/pdp/vegan.jpeg',
  },
  {
    id: 2,
    title: 'CRUELTY-FREE',
    img: '/images/pdp/cruelty-free.png',
  },
  {
    id: 3,
    title: 'ZERO WASTE',
    img: '/images/pdp/zerowaste.jpg',
  },
];

interface Props {
  product: SingleProductModel;
}

const ProductDetails: FC<Props> = ({ product: drivedProduct }: Props) => {
  const product = drivedProduct.data.product;
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [featureImageSrc, setFeatureImageSrc] = useState(
    product.featuredImage.url
  );

  const useCart = useCartStore();

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    useCart.addItem({
      id: product.id,
      handle: product.handle,
      image: product.featuredImage.url,
      price: product.priceRange.maxVariantPrice.amount,
      qty: 1,
      title: product.title,
      variantId: product.variants.nodes[0].id,
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const renderCustomSpecifications = () =>
    customSpecifications.map((c) => (
      <li
        key={c.id}
        className="flex items-center justify-end flex-col border-indigo-600 gap-5 border-2 py-5 rounded-xl"
      >
        <Image src={c.img} priority width={50} height={50} alt={c.title} />
        <p>{c.title}</p>
      </li>
    ));

  return (
    <div>
      <Head>
        <title>{product.title} | Yas Natural Solutions</title>
      </Head>
      <div className="mx-auto py-16 sm:py-24 md:max-w-1432 md:px-10">
        <Breadcrumb
          extraClassName="mb-6"
          list={[
            {
              current: false,
              href: `/collections/${product.collections?.edges[0]?.node?.handle}`,
              name: product.collections?.edges[0]?.node?.title,
            },
            {
              current: true,
              href: `/product/${product.handle}`,
              name: product.title,
            },
          ]}
        />
        {/* Product */}
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-10 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:row-end-1 lg:col-span-5">
            <div className="aspect-w-3 aspect-h-4 relative rounded-lg bg-gray-100 overflow-hidden">
              {imageIsLoading && (
                <Spinner
                  size="xl"
                  className="absolute top-0 bottom-0 left-0 right-0 m-auto z-30"
                />
              )}

              <Image
                onLoadingComplete={() => setImageIsLoading(false)}
                className={'object-center object-cover'}
                width={400}
                height={800}
                src={featureImageSrc}
                alt={product.featuredImage.altText}
              />
            </div>

            <ul className="flex flex-wrap gap-5 mt-5">
              {product?.images.edges.map((image) => (
                <li
                  key={image.node.url}
                  className={classNames(
                    'rounded-lg max-h-36 bg-gray-100 border-4 border-transparent overflow-hidden',
                    featureImageSrc === image.node.url
                      ? 'border-4 border-indigo-500'
                      : ''
                  )}
                  onClick={() => {
                    setImageIsLoading(true);
                    setFeatureImageSrc(image.node.url);
                  }}
                >
                  <Image
                    className="h-full w-full object-cover"
                    src={image.node.url}
                    alt={image.node.altText}
                    width={100}
                    height={50}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Product details */}
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-5">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>

                <p className=" text-2xl">
                  $
                  {Number(product.priceRange.maxVariantPrice.amount).toFixed(2)}
                </p>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.ratingCount?.value > rating
                          ? 'text-yellow-400'
                          : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">
                  {product.ratingCount?.value} out of 5 stars
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Add To Cart
              </button>
            </div>

            <div className={styles.ContentContainer}>
              <div className="mt-6 text-gray-900">{product.description}</div>
            </div>
            <ul className="grid grid-cols-3 mt-10 gap-5">
              {renderCustomSpecifications()}
            </ul>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="flex items-center space-x-6 mt-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
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

  const product = await storefront<SingleProductModel>(
    getProductByHandleQuery(slug as string)
  );

  return {
    props: {
      product,
    },
  } as any;
};

export default ProductDetails;
