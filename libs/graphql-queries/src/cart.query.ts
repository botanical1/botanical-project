const gql = String.raw;

const cartQuery = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
        ready
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export { cartQuery };
