export interface UserResponseModel {
  data: {
    customer: {
      id: string;
      firstName: string;
      lastName: string;
      acceptsMarketing: boolean;
      email: string;
      phone: string | null;
      defaultAddress: {
        id: string;
        address1: string;
        address2: string;
        city: string;
        company: string;
        country: string;
        firstName: string;
        lastName: string;
        phone: string;
        province: string;
        zip: string;
      };
      addresses: {
        nodes: [
          {
            address1: string;
            address2: string;
            city: string;
            company: string;
            country: string;
            firstName: string;
            lastName: string;
            id: string;
            phone: string;
            province: string;
            zip: string;
          }
        ];
      };
      orders: {
        edges: [
          {
            node: {
              id: string;
              orderNumber: number;
              fulfillmentStatus: string;
              processedAt: string;
              financialStatus: string;
              currentTotalPrice: {
                amount: string;
                currencyCode: string;
              };
            };
          }
        ];
      };
    };
  };
}

export interface UpdateUserResponseModel {
  data: {
    customerUpdate: {
      customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
      };
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      } | null;
      customerUserErrors: [
        {
          field: string[];
          message: string;
        }
      ];
    };
  };
}

interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  email: string;
  phone: string | null;
  defaultAddress: {
    id: string;
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    zip: string;
  };
  addresses: {
    nodes: [
      {
        address1: string;
        address2: string;
        city: string;
        company: string;
        country: string;
        firstName: string;
        lastName: string;
        id: string;
        phone: string;
        province: string;
        zip: string;
      }
    ];
  };
  orders: {
    edges: [
      {
        node: {
          id: string;
          orderNumber: number;
          fulfillmentStatus: string;
          processedAt: string;
          financialStatus: string;
          currentTotalPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      }
    ];
  };
}

export interface UserStoreModel {
  user: UserModel | null;
  initiate: (user: UserModel | null) => void;
  getUser: (token?: string) => void;
}
