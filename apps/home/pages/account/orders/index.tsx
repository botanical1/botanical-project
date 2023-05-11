import { FC } from 'react';
import Link from 'next/link';

import { AccountLayout } from '@shopify/components';
import { useUserStore } from '@shopify/state';

const Orders: FC = () => {
  const userStore = useUserStore();
  return (
    <AccountLayout page="Orders">
      <div className="space-y-6 sm:px-6 px-4 lg:px-0 lg:col-span-9">
        <div className="bg-white shadow rounded-md py-6 sm:px-6">
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Orders history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-16 sm:space-y-24">
              {userStore.user?.orders.edges.map(({ node: order }) => {
                const href =
                  order.id.split('/')[order.id.split('/').length - 1];
                const datePlaced = new Date(order.processedAt).toDateString();
                return (
                  <div key={order.orderNumber}>
                    <h3 className="sr-only">
                      Order placed on{' '}
                      <time dateTime={datePlaced}>{datePlaced}</time>
                    </h3>

                    <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                      <dl className="divide-y divide-gray-200 space-y-4 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-5 md:gap-x-6 lg:w-1/2 lg:flex-1 lg:gap-x-8">
                        <div className="flex justify-between md:block">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="md:mt-1">{order.orderNumber}</dd>
                        </div>
                        <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="md:mt-1">
                            <time dateTime={datePlaced}>{datePlaced}</time>
                          </dd>
                        </div>
                        <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">Payment</dt>
                          <dd className="md:mt-1">{order.financialStatus}</dd>
                        </div>
                        <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">
                            Fulfillment
                          </dt>
                          <dd className="md:mt-1">{order.fulfillmentStatus}</dd>
                        </div>
                        <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                          <dt>Total amount</dt>
                          <dd className="md:mt-1">
                            ${order.currentTotalPrice.amount}
                          </dd>
                        </div>
                      </dl>
                      <div className="space-y-4 mt-6 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                        <Link href={`/account/orders/${href}`}>
                          <a className="w-full flex items-center justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:w-auto">
                            View Order
                            <span className="sr-only">{order.orderNumber}</span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Orders;
