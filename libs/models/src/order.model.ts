export interface OrderResponseModel {
  data: {
    node: {
      id: string;
      name: string;
      orderNumber: number;
      processedAt: string;
      fulfillmentStatus: string;
      financialStatus: string;
      currentTotalPrice: {
        amount: string;
      };
      shippingAddress: {
        address1: string;
      };
      currentSubtotalPrice: {
        amount: string;
      };
      totalTaxV2: {
        amount: string;
      };
      lineItems: {
        edges: [
          {
            node: {
              currentQuantity: number;
              title: string;
              discountedTotalPrice: {
                amount: string;
              };
              variant: {
                image: {
                  url: string;
                };
                product: {
                  description: string;
                  handle: string;
                };
              };
            };
          }
        ];
      };
    };
  };
}

interface OrderModel {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  currentTotalPrice: {
    amount: string;
  };
  shippingAddress: {
    address1: string;
  };
  currentSubtotalPrice: {
    amount: string;
  };
  totalTaxV2: {
    amount: string;
  };
  lineItems: {
    edges: [
      {
        node: {
          currentQuantity: number;
          title: string;
          discountedTotalPrice: {
            amount: string;
          };
          variant: {
            image: {
              url: string;
            };
            product: {
              description: string;
              handle: string;
            };
          };
        };
      }
    ];
  };
}

export interface OrderStoreModel {
  order: OrderModel | null;
  initiate: (order: OrderModel | null) => void;
  getOrder: (id: string) => void;
}
