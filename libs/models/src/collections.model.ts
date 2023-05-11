import { ProductModel } from './products.model';

export interface CollectionsModel {
  title: string;
  descriptionHtml: string;
  handle: string;
  image: {
    url: string;
    altText: string;
  };
}

export interface CollectionsListModel {
  data: {
    collections: {
      nodes: CollectionsModel
    }
  }
}

export interface CollectionModel {
  title: string;
  handle: string;
  products: {
    nodes: ProductModel[];
  };
}

export interface SingleCollectionModel {
  data: {
    collection: CollectionModel;
  };
}
