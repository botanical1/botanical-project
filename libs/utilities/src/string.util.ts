export const truncateString = (str: string, num: number) => {
  if (str && str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
};

export const extractHandleFromUrl = (
  link: string,
  type: 'COLLECTION' | 'PAGE' | 'SHOP_POLICY' | 'BLOG' | 'ARTICLE'
) => {
  const collectionRegex = /.*collections\/(.*)/gm;
  const pageRegex = /.*pages\/(.*)/gm;
  const policyRegex = /.*policies\/(.*)/gm;
  const blogRegex = /.*blogs\/(.*)/gm;

  switch (type) {
    case 'COLLECTION':
      const collectionSlug = collectionRegex.exec(link)?.[1];
      return `/collections/${collectionSlug}`;

    case 'PAGE':
      const pageSlug = pageRegex.exec(link)?.[1];
      return `/pages/${pageSlug}`;

    case 'SHOP_POLICY':
      const policySlug = policyRegex.exec(link)?.[1];
      return `/policies/${policySlug}`;

      case "ARTICLE":
      case 'BLOG':
        const blugSlug = blogRegex.exec(link)?.[1];
        return `/blogs/${blugSlug}`;
  }
};
