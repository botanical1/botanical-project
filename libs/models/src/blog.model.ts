export interface BlogsResponseModel {
  data: {
    blogs: {
      edges: [
        {
          node: {
            title: string;
            handle: string;
          };
        }
      ];
    };
  };
}

export interface BlogArticlesResponseModel {
  data: {
    blog: {
      articles: {
        edges: {
          node: {
            handle: string;
            title: string;
            id: string;
            publishedAt: string;
            image: {
              url: string;
              width: number;
              height: number;
              altText: string;
            };
            authorV2: {
              name: string;
            };
          };
        }[];
      };
    };
  };
}

export interface ArticleResponseModel {
  data: {
    blog: {
      articleByHandle: {
        content: string;
        handle: string;
        title: string;
        id: string;
        publishedAt: string;
        image: {
          url: string;
          width: number;
          height: number;
          altText: string;
        };
        authorV2: {
          name: string;
        };
      };
    };
  };
}
