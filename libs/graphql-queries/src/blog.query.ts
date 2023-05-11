const gql = String.raw;

const blogsQuery = gql`
  {
    blogs(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

const getBlogArticlesByHandleQuery = (handle: string) => {
  const getBlogArticleQuery = gql`
    {
      blog(handle: "${handle}") {
        title
        articles(first: 100) {
          edges {
            node {
              handle
              title
              id
              publishedAt
              image {
                url
                width
                height
                altText
              }
              authorV2 {
                name
              }
            }
          }
        }
      }
    }
  `;
  return getBlogArticleQuery;
};

const getArticleByHandleQuery = (blogHandle: string, articleHandle: string) => {
  const getBlogArticleQuery = gql`
    {
      blog(handle: "${blogHandle}") {
        articleByHandle(handle: "${articleHandle}"){
              content
              handle
              title
              id
              publishedAt
              image {
                url
                width
                height
                altText
              }
              authorV2 {
                name
              }
        }
      }
    }
  `;
  return getBlogArticleQuery;
};

export { blogsQuery, getBlogArticlesByHandleQuery, getArticleByHandleQuery };
