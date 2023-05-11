import { CollectionModel } from './collections.model';
import { MenuModel } from './menu.model';

export interface HomeBasicModel {
  data: {
    trendingProducts: CollectionModel;
    bestSellersProducts: CollectionModel;
  };
}

export interface MenuBasicModel {
    menu: { items: MenuModel[] };
}
