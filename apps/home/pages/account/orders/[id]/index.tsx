import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useOrderStore } from '@shopify/state';
import { AccountLayout } from '@shopify/components';
import Link from 'next/link';

const OrderDetails: FC = () => {
  const router = useRouter();
  const orderStore = useOrderStore();
  useEffect(() => {
    orderStore.getOrder(
      `gid://shopify/Order/${router.query.id}?key=${router.query.key}`
    );
  }, []);

  return (
    <AccountLayout page="Orders">
      <main className="lg:col-span-9 sm:px-6 px-4 lg:px-0">
        <div className="bg-white shadow rounded p-6">
          <div className="text-indigo-600">
            Order - {orderStore.order?.orderNumber}
          </div>

          <section
            aria-labelledby="order-heading"
            className="mt-10 border-t border-gray-200"
          >
            <h2 id="order-heading" className="sr-only">
              Your order
            </h2>

            <h3 className="sr-only">Items</h3>
            {orderStore.order?.lineItems.edges.map((item, index) => (
              <div
                key={index}
                className="py-10 border-b border-gray-200 flex space-x-6"
              >
                <img
                  src={item.node.variant.image.url}
                  alt={item.node.title}
                  className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                />
                <div className="flex-auto flex flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <Link
                        href={`/product/${item.node.variant.product.handle}`}
                      >
                        <a>{item.node.title}</a>
                      </Link>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {item.node.variant?.product?.description}
                    </p>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {item.node.currentQuantity}
                        </dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          {item.node.discountedTotalPrice.amount}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              {orderStore.order?.shippingAddress?.address1 && (
                <>
                  <h4 className="sr-only">Addresses</h4>
                  <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
                    <div>
                      <dt className="font-medium text-gray-900">
                        Shipping address
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <address className="not-italic">
                          <span className="block">
                            {orderStore.order?.shippingAddress?.address1}
                          </span>
                        </address>
                      </dd>
                    </div>
                    {/* <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Kristin Watson</span>
                      <span className="block">7363 Cynthia Pass</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div> */}
                  </dl>
                </>
              )}

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">
                    ${orderStore.order?.currentSubtotalPrice?.amount}
                  </dd>
                </div>
                {/* <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">
                    Discount
                    <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2">
                      STUDENT50
                    </span>
                  </dt>
                  <dd className="text-gray-700">-$18.00 (50%)</dd>
                </div> */}
                {/* <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Shipping</dt>
                  <dd className="text-gray-700">$5.00</dd>
                </div> */}
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Tax</dt>
                  <dd className="text-gray-700">
                    ${orderStore.order?.totalTaxV2?.amount}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">
                    {' '}
                    ${orderStore.order?.currentTotalPrice?.amount}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </main>
    </AccountLayout>
  );
};

export default OrderDetails;
