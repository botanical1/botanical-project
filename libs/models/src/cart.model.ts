export interface CartResponseModel {
  data: {
    checkoutCreate: {
      checkout: {
        webUrl: string;
        ready: boolean;
      };
      checkoutUserErrors: {
        field: string[];
        message: string;
      };
    };
  };
}

export interface CartItemModel {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
  qty: number;
  variantId: string;
}

export interface CartStoreModel {
  items: CartItemModel[];
  initiate: (items: CartItemModel[]) => void;
  subtotal: () => string;
  addItem: (item: CartItemModel) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  changeQty: (id: string, newQty: number) => void;
  decreaseQty: (id: string) => void;
}
