export default async function storefront<T>(query: any, variables = {}) : Promise<T>{
  const response = await fetch(process.env['NEXT_PUBLIC_API_URL'] ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env['NEXT_PUBLIC_STORE_TOKEN'] ?? '',
    },
    body: JSON.stringify({ query, variables }),
  });

  return response.json() as Promise<T>;
}
