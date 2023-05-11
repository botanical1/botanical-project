import { FC } from 'react';
import Image from 'next/future/image';

import {
  Container,
  Perks,
  ProductList,
  SelectedCategories,
  Testimonials,
} from '@shopify/components';
import { homeStructureQuery } from '@shopify/graphql-queries';
import { HomeBasicModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';

const Index: FC<HomeBasicModel> = ({ data }) => {
  return (
    <>
      <Container className="pt-28 flex  lg:px-10 2xl:px-0 flex-col gap-16 lg:gap-0 lg:flex-row items-center justify-end relative">
        <div className="flex flex-col text-center lg:text-left gap-4 z-10 leading-none lg:absolute left-0 max-w-[800px]">
          <h2 className="text-52 lg:text-122 font-normal text-dark">
            The lorem ipsum for dalor este
          </h2>
          <h3 className="text-base lg:text-2xl font-normal text-dark">
            Quis eu at condimentum amet sed facilisi viverra. Sit fames sed
            auctor tincidunt.
          </h3>
        </div>
        <div className="bg-yasBackgroundDark w-full lg:w-[776px] h-80 lg:h-[608px] rounded-xl"></div>
      </Container>

      <Container className="py-24 md:px-10">
        <ProductList
          title={data.trendingProducts.title}
          moreText="Shop the collection"
          moreUrl={`/collections/${data.trendingProducts.handle}`}
          products={data.trendingProducts.products}
          badge="TRENDING"
        />
      </Container>
      <section className="bg-lightest py-24 md:px-10">
        <Perks />
      </section>
      <Container className="py-24 md:px-10">
        <ProductList
          title={data.bestSellersProducts.title}
          moreText="Shop the collection"
          moreUrl={`/collections/${data.bestSellersProducts.handle}`}
          products={data.bestSellersProducts.products}
          badge="BEST SELLER"
        />
      </Container>

      <div className="bg-lightest py-20 md:px-10">
        <SelectedCategories />
      </div>

      <div className="pt-24 pb-56">
        <Testimonials />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await storefront<HomeBasicModel>(homeStructureQuery);

  return {
    props: {
      data,
    },
  };
}

export default Index;
