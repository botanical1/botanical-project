const gql = String.raw;

const menuQuery = gql`
  {
    menu(handle: "main-menu") {
      items {
        title
        type
        resourceId
        url
        items {
          title
          type
          resourceId
          url
        }
      }
    }
  }
`;

const homeStructureQuery = gql`
  {
    trendingProducts: collection(handle: "trending-products") {
      title
      handle
      products(first: 4) {
        nodes {
          variants(first: 1) {
            nodes {
              id
            }
          }
          handle
          description
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
    bestSellersProducts: collection(handle: "best-sellers") {
      title
      handle
      products(first: 4) {
        nodes {
          handle
          description
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

export { homeStructureQuery, menuQuery };
