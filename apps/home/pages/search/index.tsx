import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { Container, ProductCard } from '@shopify/components';
import { getSearchedProducts } from '@shopify/graphql-queries';
import { getSearchedproductsResponseModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import { SearchIcon } from '@heroicons/react/outline';

const Search: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState([]);
  const handleSearch = async () => {
    setLoading(true);
    const searchResponse = await storefront<getSearchedproductsResponseModel>(
      getSearchedProducts,
      {
        input: search,
      }
    );

    if (searchResponse?.data?.products) {
      setProducts(searchResponse?.data?.products?.edges);
      toast.success('searched Correctly');
    }
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Enter' && !loading) {
      handleSearch();
    }
  };
  return (
    <div className="py-12">
      <div className="min-h-full flex flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Search Results
          </h2>
          <div className="mt-4 relative flex items-center">
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              disabled={loading}
              onKeyDown={handleKeyDown}
              onChange={(event) => setSearch(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div
              className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            >
              <SearchIcon className="w-6 h-6" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="h-74 mt-12">
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
          </div>
        </div>
      ) : !products.length ? (
        <div className="min-h-full flex flex-col justify-center px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-md mt-12">
          <p className="text-center text-1xl font-extrabold text-gray-600">
            There is not any matched product!
          </p>
        </div>
      ) : (
        <section className="bg-neutral-100 mt-12">
          <Container paddingOnDesktop={false}>
            <div className="max-w-2xl mx-auto py-8 sm:py-10 sm:px-6 md:max-w-1432 lg:px-86">
              <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-2 xs:gap-y-1 sm:gap-x-6 md:grid-cols-4 md:gap-y-8 lg:gap-x-8">
                {products?.map((item: any) => {
                  const product = item.node;
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Search;
