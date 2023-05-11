import { FC } from 'react';

import Link from 'next/link';

import { ProductsModel } from '@shopify/models';

import ProductCard from '../product-card';
import { IconChevronRight } from '@tabler/icons';

interface Props {
  title: string;
  moreText: string;
  moreUrl: string;
  products: ProductsModel;
  badge?: string;
}

const ProductList: FC<Props> = ({
  title,
  moreText,
  moreUrl,
  products,
  badge,
}) => {
  return (
    <>
      <div className="flex items-center justify-between flex-col">
        <h2 className="text-4xl md:text-52 font-medium text-center mb-5 text-neutral">
          {title}
        </h2>
        <Link href={moreUrl}>
          <a className="font-semibold text-sm md:text-18 text-yasLink hover:opacity-70 md:flex items-center gap-1 mt-1 flex">
            {moreText}
            <span aria-hidden="true">
              <IconChevronRight size={20} />
            </span>
          </a>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-y-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-6 md:gap-x-6">
        {products.nodes.map((product: any) => (
          <ProductCard key={product.id} product={product} badge={badge} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
