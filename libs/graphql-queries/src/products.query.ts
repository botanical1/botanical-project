const gql = String.raw;

const getTrendingProducts = gql`
  query trendingProducts {
    collection(handle: "trending-products") {
      title
      products(first: 4) {
        nodes {
          handle
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
const getSearchedProducts = gql`
  query getSearchedProducts($input: String!) {
    products(first: 10, query: $input) {
      edges {
        node {
          variants(first: 1) {
            nodes {
              id
            }
          }
          title
          id
          handle
          availableForSale
          descriptionHtml
          description
          ratingCount: metafield(namespace: "reviews", key: "rating_count") {
            type
            value
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          productType
          seo {
            description
            title
          }
          featuredImage {
            url
            height
            width
            altText
          }
          images(first: 10) {
            edges {
              node {
                altText
                height
                url
                width
              }
            }
          }
        }
      }
    }
  }
`;

export { getTrendingProducts, getSearchedProducts };
