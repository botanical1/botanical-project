const gql = String.raw;

const getProductByHandleQuery = (handle: string) => gql`
  query getProduct {
    product(handle: "${handle}") {
      variants(first:1) {
        nodes {
          id
        }
      }
      title
      id
      handle
      description
      collections(first: 1) {
        edges {
          node {
            title
            handle
          }
        }
      }
      availableForSale
      descriptionHtml
      ratingCount: metafield(namespace:"reviews", key:"rating_count"){
        type
        value
      },
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
`;

export { getProductByHandleQuery };
