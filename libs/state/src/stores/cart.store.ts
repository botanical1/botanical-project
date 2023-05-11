import toast from 'react-hot-toast';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';

import { CartItemModel, CartStoreModel } from '@shopify/models';

const useCartStore = create<CartStoreModel>((set, get) => ({
  items: [],
  initiate: (newItems) =>
    set((state) => {
      return { items: newItems };
    }),
  addItem: (item) =>
    set((state) => {
      const isExist = state.items.find((x) => x.id === item.id);

      const cartLocalData = localStorage.getItem('user_cart');

      if (cartLocalData) {
        const parsedData: CartItemModel[] = JSON.parse(cartLocalData);

        if (isExist) {
          const newList = parsedData.map((p) => {
            if (p.id === item.id) p.qty += 1;

            return p;
          });

          localStorage.setItem('user_cart', JSON.stringify(newList));
        } else {
          parsedData.push(item);
          localStorage.setItem('user_cart', JSON.stringify(parsedData));
        }
      } else {
        localStorage.setItem('user_cart', JSON.stringify([item]));
      }

      toast.success('Product added to your cart!');

      if (isExist) {
        return {
          items: state.items.map((p) => {
            if (p.id === item.id) p.qty += 1;

            return p;
          }),
        };
      }

      return { items: [...state.items, item] };
    }),
  decreaseQty: (id) =>
    set((state) => {
      return {
        items: state.items.map((p) => {
          if (p.id === id && p.qty > 1) p.qty -= 1;

          return p;
        }),
      };
    }),
  increaseQty: (id) =>
    set((state) => {
      return {
        items: state.items.map((p) => {
          if (p.id === id) p.qty += 1;

          return p;
        }),
      };
    }),
  changeQty: (id, newQty) =>
    set((state) => {
      return {
        items: state.items.map((p) => {
          if (p.id === id) p.qty = newQty;

          return p;
        }),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const isExist = state.items.find((x) => x.id === id);

      const cartLocalData = localStorage.getItem('user_cart');

      if (cartLocalData) {
        const parsedData: CartItemModel[] = JSON.parse(cartLocalData);
        const newLocalData = parsedData.filter((p) => p.id !== id);
        localStorage.setItem('user_cart', JSON.stringify(newLocalData));
      }

      toast.success('Product removed from your cart!');

      if (isExist) {
        return {
          items: state.items.filter((p) => {
            return p.id !== id;
          }),
        };
      }

      return state;
    }),
  subtotal: () => {
    const items = get().items;
    let totalValue = 0;

    items.forEach((p) => {
      totalValue += +(+p.price * p.qty);
    });

    return totalValue.toString();
  },
}));

if (process.env['NODE_ENV'] === 'development') {
  mountStoreDevtool('CartStore', useCartStore);
}

export default useCartStore;
