import React, { useMemo, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCartStore, useUserStore } from '@shopify/state';
import { storefront } from '@shopify/utilities';
import { cartQuery } from '@shopify/graphql-queries';
import { CartResponseModel } from '@shopify/models';
import { ShoppingCartEmptyState, Spinner } from '@shopify/components';

const Cart = () => {
  const cartStore = useCartStore();
  const userStore = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const isCartEmpty = !cartStore.items?.length;

  const handleRemoveProduct = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.removeItem(id);
  };

  const handleChangeQty = (id: string, qty: string) => {
    cartStore.changeQty(id, +qty);
  };

  const shippingAddress = useMemo(() => {
    if (userStore.user?.defaultAddress) {
      const shippingAddress = { ...userStore.user?.defaultAddress };
      delete shippingAddress.id;
      return shippingAddress;
    } else if (userStore.user?.addresses?.nodes?.length) {
      const shippingAddress = { ...userStore.user?.addresses?.nodes[0] };
      delete shippingAddress.id;
      return shippingAddress;
    } else {
      return null;
    }
  }, [userStore.user]);

  const handleGoToCheckout = async () => {
    setLoading(true);
    const cartResponse = await storefront<CartResponseModel>(cartQuery, {
      input: {
        ...(userStore.user?.email && { email: userStore.user?.email }),
        allowPartialAddresses: true,
        buyerIdentity: {
          countryCode: 'US',
        },
        lineItems: cartStore.items.map((item) => ({
          quantity: item.qty,
          variantId: item.variantId,
        })),
        ...(shippingAddress && {
          shippingAddress: shippingAddress,
        }),
      },
    });
    const redirectURL = cartResponse.data.checkoutCreate?.checkout.webUrl;
    if (redirectURL) {
      router.push(redirectURL);
    }
    setLoading(false);
  };

  return (
    <>
      {isCartEmpty ? (
        <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 md:max-w-1432 lg:px-8">
          <ShoppingCartEmptyState />
        </main>
      ) : (
        <main className="max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 md:max-w-1432 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Bag
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className=" divide-y divide-gray-200">
                {cartStore.items.map((product, productIdx) => (
                  <li
                    key={product.id}
                    className="flex flex-col rounded-md p-4 bg-white"
                  >
                    <div className="flex items-center">
                      <div className="w-28 h-28">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={50}
                          height={50}
                          className="rounded-md min-h-full min-w-fit"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link href={`/product/${product.handle}`}>
                                <a className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.title}
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label
                        htmlFor={`quantity-${productIdx}`}
                        className="sr-only"
                      >
                        Quantity, {product.title}
                      </label>
                      <select
                        id={`quantity-${productIdx}`}
                        name={`quantity-${productIdx}`}
                        defaultValue={product.qty}
                        onChange={(e) =>
                          handleChangeQty(product.id, e.target.value)
                        }
                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1 justify-between mt-5">
                      <button
                        type="button"
                        // onClick={() => setOpen(false)}
                        className="text-center w-full flex items-center px-3 py-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        edit
                      </button>
                      <button
                        onClick={(e) => handleRemoveProduct(e, product.id)}
                        type="button"
                        className="w-full flex items-center px-3 py-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-12 bg-gray-50 rounded-lg lg:col-span-5"
            >
              <div className=" border-gray-200 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${cartStore.subtotal()}
                </dd>
              </div>
              <p className="text-zinc-400">
                Taxes and shipping calculated at checkout
              </p>

              <div className="mt-6">
                <button
                  onClick={handleGoToCheckout}
                  disabled={loading}
                  className="w-full bg-dark border border-transparent rounded-full shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  {loading && <Spinner />}
                  Continue to checkout
                </button>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;
