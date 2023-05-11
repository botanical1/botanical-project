const gql = String.raw;

const getOrderByHandleQuery = (id: string) => {
  const getOrderQuery = gql`
    query {
      node(id: "${id}") {
        id
        ... on Order {
            name
            orderNumber
            processedAt
            fulfillmentStatus
            financialStatus
            currentTotalPrice {
              amount
            }
            shippingAddress {
              address1
            }
            currentSubtotalPrice {
              amount
            }
            totalTaxV2 {
              amount
            }
            lineItems(first:10) {
                edges {
                  node {
                    currentQuantity
                    title
                    discountedTotalPrice {
                      amount
                    }
                    variant {
                      image {
                        url
                      }
                      product {
                        description 
                        handle
                      }
                    }
                  }
                }
            }
        }
      }
    }
  `;
  return getOrderQuery;
};

export { getOrderByHandleQuery };
