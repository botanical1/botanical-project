const gql = String.raw;

const registerQuery = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        phone
        acceptsMarketing
        firstName
        lastName
      }
      userErrors {
        field
        message
      }
    }
  }
`;
const loginQuery = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
const recoverPasswordEmailQuery = gql`
  mutation customerResetByUrl($input: String!) {
    customerRecover(email: $input) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const resetPasswordQuery = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export {
  registerQuery,
  loginQuery,
  recoverPasswordEmailQuery,
  resetPasswordQuery,
};
