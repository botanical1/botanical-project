import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';

import { OrderResponseModel, OrderStoreModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import { getOrderByHandleQuery } from '@shopify/graphql-queries';

const useOrderStore = create<OrderStoreModel>((set, get) => ({
  order: null,
  initiate: (order) =>
    set(() => {
      return { order };
    }),
  getOrder: async (id) => {
    const orderResponse = await storefront<OrderResponseModel>(
      getOrderByHandleQuery(id)
    );
    if (orderResponse.data?.node) {
      set({ order: orderResponse.data.node });
    } else {
      set({ order: null });
    }
  },
}));

if (process.env['NODE_ENV'] === 'development') {
  mountStoreDevtool('OrderStore', useOrderStore);
}

export default useOrderStore;
