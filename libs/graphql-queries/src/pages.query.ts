const gql = String.raw;

const pageQuery = (handle: string) => gql`
{
    page(handle:"${handle}"){
      title
      body
      handle
    }
  }
`;

export { pageQuery };
