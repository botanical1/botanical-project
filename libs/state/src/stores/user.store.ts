import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';

import { UserResponseModel, UserStoreModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import { getUserByHandleQuery } from '@shopify/graphql-queries';

const useUserStore = create<UserStoreModel>((set, get) => ({
  user: null,
  initiate: (newUser) =>
    set(() => {
      return { user: newUser };
    }),
  getUser: async (newtoken) => {
    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token') ||
      newtoken ||
      '';

    const getUser = async () => {
      const userResponse = await storefront<UserResponseModel>(
        getUserByHandleQuery(token)
      );

      set({ user: userResponse?.data?.customer });
    };
    if (token) {
      getUser();
    } else {
      set({ user: null });
    }
  },
}));

if (process.env['NODE_ENV'] === 'development') {
  mountStoreDevtool('UserStore', useUserStore);
}

export default useUserStore;
