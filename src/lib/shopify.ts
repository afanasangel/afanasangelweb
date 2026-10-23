export interface ShopifyImage {
  url: string;
  altText?: string | null;
}

export interface ShopifyProductOption {
  id?: string;
  name: string;
  values: string[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  priceNumeric: number;
  compareAtPrice?: string | null;
  sku: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  category?: string;
  price: string;
  priceNumeric: number;
  originalPrice?: string;
  imageUrl: string;
  images: string[];
  options: ShopifyProductOption[];
  variants: ShopifyVariant[];
  tags: string[];
  collections?: Array<{ id: string; title: string; handle: string }>;
  vendor?: string;
  availableForSale?: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  imageUrl?: string;
}

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || "afnasangel.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_API_KEY || "e52d6936efcc9c5d20fe8a938ddcb923";

/**
 * Execute Storefront GraphQL query
 */
export async function storefrontFetch<T = any>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    return null;
  }

  try {
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      console.error(`Shopify Storefront API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.error("Failed storefront fetch:", error);
    return null;
  }
}

function mapProductNode(p: any): ShopifyProduct {
  const firstVariant = p.variants?.edges?.[0]?.node;
  const priceAmount = parseFloat(p.priceRange?.minVariantPrice?.amount || firstVariant?.price?.amount || "0");
  const currency = p.priceRange?.minVariantPrice?.currencyCode || "INR";
  const compareAmount = parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount || firstVariant?.compareAtPrice?.amount || "0");
  
  const imageUrl = p.images?.edges?.[0]?.node?.url || "";
  const images = (p.images?.edges || []).map((img: any) => img.node.url);

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description || "",
    descriptionHtml: p.descriptionHtml || p.description || "",
    category: p.productType || "Collection",
    price: `${currency} ${priceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
    priceNumeric: priceAmount,
    originalPrice: compareAmount > 0 ? `${currency} ${compareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : undefined,
    imageUrl,
    images,
    options: (p.options || []).map((opt: any) => ({
      id: opt.id || opt.name,
      name: opt.name,
      values: opt.values || [],
    })),
    variants: (p.variants?.edges || []).map((v: any) => {
      const vPrice = parseFloat(v.node.price?.amount || "0");
      const vCurrency = v.node.price?.currencyCode || currency;
      const vCompare = parseFloat(v.node.compareAtPrice?.amount || "0");
      return {
        id: v.node.id,
        title: v.node.title,
        sku: v.node.sku || "",
        price: `${vCurrency} ${vPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        priceNumeric: vPrice,
        compareAtPrice: vCompare > 0 ? `${vCurrency} ${vCompare.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : null,
        availableForSale: Boolean(v.node.availableForSale),
        selectedOptions: v.node.selectedOptions || [],
      };
    }),
    tags: p.tags || [],
    collections: (p.collections?.edges || []).map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      handle: e.node.handle,
    })),
    vendor: p.vendor,
    availableForSale: p.availableForSale,
  };
}

/**
 * Fetch products optionally filtered by collection handle
 */
export async function getShopifyProducts(collectionHandle?: string, limit = 50): Promise<ShopifyProduct[]> {
  if (collectionHandle) {
    const query = `
      query getCollectionProducts($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          id
          title
          handle
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
                productType
                vendor
                tags
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 10) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      sku
                      availableForSale
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
                collections(first: 10) {
                  edges {
                    node {
                      id
                      title
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

    // Try primary handle
    let data = await storefrontFetch<{ collection: { products: { edges: Array<{ node: any }> } } | null }>(query, {
      handle: collectionHandle,
      first: limit,
    });
    let nodes = data?.collection?.products?.edges?.map((e) => e.node) || [];

    // If no products and handle has an alternative suffix (e.g. -1 or coords/co-ord-sets)
    if (nodes.length === 0) {
      const aliasMap: Record<string, string> = {
        "premium-abaya": "premium-abaya-1",
        "premium-pakistani-suit": "premium-pakistani-suits-1",
        "premium-pakistani-suits": "premium-pakistani-suits-1",
        "pakistani-suit": "pakistani-suits",
        "coords": "co-ord-sets",
        "coord-sets": "co-ord-sets",
      };
      const altHandle = aliasMap[collectionHandle] || (collectionHandle.endsWith("-1") ? collectionHandle.replace(/-1$/, "") : `${collectionHandle}-1`);
      if (altHandle && altHandle !== collectionHandle) {
        const altData = await storefrontFetch<{ collection: { products: { edges: Array<{ node: any }> } } | null }>(query, {
          handle: altHandle,
          first: limit,
        });
        const altNodes = altData?.collection?.products?.edges?.map((e) => e.node) || [];
        if (altNodes.length > 0) {
          nodes = altNodes;
        }
      }
    }

    // Return only the products added to this collection (do not fallback to all products)
    return nodes.map(mapProductNode);
  }

  // Fetch all products
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            vendor
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            options {
              id
              name
              values
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            collections(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ products: { edges: Array<{ node: any }> } }>(query, { first: limit });
  const nodes = data?.products?.edges?.map((e) => e.node) || [];
  return nodes.map(mapProductNode);
}

/**
 * Fetch all collections from Shopify
 */
export async function getShopifyCollections(limit = 30): Promise<ShopifyCollection[]> {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ collections: { edges: Array<{ node: any }> } }>(query, { first: limit });
  const rawList = (data?.collections?.edges || []).map((e) => ({
    id: e.node.id,
    title: e.node.title,
    handle: e.node.handle,
    description: e.node.description,
    imageUrl: e.node.image?.url,
  }));

  // Standard collection order & deduplication map
  const standardCollections: Array<{ handle: string; title: string }> = [
    { handle: "premium-abaya", title: "Premium Abaya" },
    { handle: "abaya", title: "Abaya" },
    { handle: "budget-friendly-abaya", title: "Budget Friendly Abaya" },
    { handle: "premium-pakistani-suits", title: "Premium Pakistani Suits" },
    { handle: "pakistani-suits", title: "Pakistani Suits" },
    { handle: "budget-friendly-suits", title: "Budget Friendly Suits" },
    { handle: "co-ord-sets", title: "Co-ord Sets" },
  ];

  // Map each standard collection to the best matching live Shopify collection ID
  const result: ShopifyCollection[] = [];
  const seenHandles = new Set<string>();

  for (const std of standardCollections) {
    const matched = rawList.find(
      (c) =>
        c.handle.toLowerCase() === std.handle.toLowerCase() ||
        c.handle.toLowerCase() === `${std.handle.toLowerCase()}-1` ||
        c.title.toLowerCase().replace(/[\s\-_]/g, "") === std.title.toLowerCase().replace(/[\s\-_]/g, "")
    );
    if (matched) {
      result.push({
        id: matched.id,
        title: std.title,
        handle: std.handle,
        description: matched.description,
        imageUrl: matched.imageUrl,
      });
      seenHandles.add(matched.handle.toLowerCase());
      seenHandles.add(std.handle.toLowerCase());
    }
  }

  // Include any other user-created live collections not in the standard list
  for (const c of rawList) {
    const baseHandle = c.handle.replace(/-1$/, "");
    if (!seenHandles.has(c.handle.toLowerCase()) && !seenHandles.has(baseHandle.toLowerCase())) {
      result.push({
        id: c.id,
        title: c.title,
        handle: c.handle,
        description: c.description,
        imageUrl: c.imageUrl,
      });
      seenHandles.add(c.handle.toLowerCase());
    }
  }

  return result;
}

/**
 * Fetch a single product by handle
 */
export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        productType
        vendor
        tags
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ product: any }>(query, { handle });
  if (!data?.product) return null;
  return mapProductNode(data.product);
}

/**
 * Creates a direct Shopify checkout URL
 */
export function getShopifyCheckoutUrl(items: { variantId?: string; quantity: number }[]): string {
  if (items.length === 0) return `https://${SHOPIFY_DOMAIN}/cart`;
  
  const formattedItems = items
    .filter((i) => Boolean(i.variantId))
    .map((i) => {
      const rawId = i.variantId!.includes("/") ? i.variantId!.split("/").pop() : i.variantId;
      return `${rawId}:${i.quantity}`;
    });

  if (formattedItems.length === 0) return `https://${SHOPIFY_DOMAIN}/cart`;
  return `https://${SHOPIFY_DOMAIN}/cart/${formattedItems.join(",")}`;
}
