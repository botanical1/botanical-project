const gql = String.raw;
const getCollectionByHandleQuery = (
  handle: string,
  filters: {
    availability: boolean;
    sort_by: string;
    price_min: number;
    price_max: number;
  }
) => {
  const splittedSort = filters.sort_by.split('-');
  const sortKey = splittedSort[0];
  const reverse = splittedSort[1] === 'descending' ?? false;

  const gqlFilters = {
    ...(filters.availability && { available: filters.availability }),
    price: { min: filters.price_min, max: filters.price_max },
  };

  const query = gql`
   {
    collection(handle: "${handle}") {
      title
      handle
      products(
        first: 100
        sortKey: ${sortKey.toUpperCase()}
        reverse: ${reverse}
        filters: ${JSON.stringify(gqlFilters).replace(/"/g, '')}
      ) {
        nodes {
          variants(first:1) {
            nodes {
              id
            }
          }
          handle
          id
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          availableForSale
          featuredImage {
            altText
            height
            width
            url
            id
          }
        }
      }
    }
  }
`;
  return query;
};

const getCollections = gql`
  {
    collections(first: 100) {
      nodes {
        title
        descriptionHtml
        handle
        image {
          url
          altText
        }
      }
    }
  }
`;

export { getCollectionByHandleQuery, getCollections };
