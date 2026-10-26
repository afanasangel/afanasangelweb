import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  process.env.SHOPIFY_STORE_DOMAIN ||
  "afnasangel.myshopify.com";

// In-memory short TTL cache (15 seconds) to avoid spamming Shopify while keeping stock live
const stockCache = new Map<string, { quantity: number | null; available: boolean; expires: number }>();

/**
 * Probes Shopify store for the true available stock of a variant
 */
async function probeShopifyStock(variantNumericId: string): Promise<{ quantity: number | null; available: boolean }> {
  const cacheKey = variantNumericId;
  const cached = stockCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return { quantity: cached.quantity, available: cached.available };
  }

  try {
    const dummySessionCookie = `cart=stock_probe_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const headers = {
      "Content-Type": "application/json",
      "Cookie": dummySessionCookie,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    // Requesting a high quantity causes Shopify to return the exact availability constraint in status 422
    const addRes = await fetch(`https://${SHOPIFY_DOMAIN}/cart/add.js`, {
      method: "POST",
      headers,
      body: JSON.stringify({ items: [{ id: Number(variantNumericId), quantity: 99999 }] }),
      cache: "no-store",
    });

    const data = await addRes.json();

    // Immediately clear the dummy cart session
    fetch(`https://${SHOPIFY_DOMAIN}/cart/clear.js`, {
      method: "POST",
      headers,
      cache: "no-store",
    }).catch(() => {});

    let quantity: number | null = null;
    let available = true;

    if (addRes.status === 422) {
      const msg = data.description || data.message || "";
      // e.g. "Only 20 items were added to your cart due to availability." or "Only 3 items were added..."
      const match = msg.match(/Only\s+(\d+)\s+items/i);
      if (match) {
        quantity = parseInt(match[1], 10);
        available = quantity > 0;
      } else if (msg.toLowerCase().includes("sold out") || msg.toLowerCase().includes("out of stock") || msg.toLowerCase().includes("all 0")) {
        quantity = 0;
        available = false;
      }
    } else if (addRes.ok) {
      // If Shopify accepted 99999 items, it's abundant stock (untracked or huge)
      quantity = 999;
      available = true;
    }

    stockCache.set(cacheKey, {
      quantity,
      available,
      expires: Date.now() + 15000, // 15 seconds cache
    });

    return { quantity, available };
  } catch (err) {
    return { quantity: null, available: true };
  }
}

/**
 * GET /api/inventory?handle=[product-handle]&variantId=[variant-numeric-or-gid]
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const variantIdParam = searchParams.get("variantId");

  if (!handle && !variantIdParam) {
    return NextResponse.json({ error: "Product handle or variantId required" }, { status: 400 });
  }

  try {
    let cleanVariantId = variantIdParam ? variantIdParam.split("/").pop() || "" : "";

    // If handle is provided but variantId is missing or needs resolving
    if (handle && !cleanVariantId) {
      try {
        const productJsRes = await fetch(`https://${SHOPIFY_DOMAIN}/products/${handle}.js`, {
          cache: "no-store",
        });
        if (productJsRes.ok) {
          const productData = await productJsRes.json();
          cleanVariantId = String(productData.variants?.[0]?.id || "");
        }
      } catch {
        // Continue
      }
    }

    if (!cleanVariantId) {
      return NextResponse.json({
        handle,
        variantId: null,
        availableForSale: true,
        quantityAvailable: null,
      });
    }

    const { quantity, available } = await probeShopifyStock(cleanVariantId);

    return NextResponse.json({
      handle,
      variantId: cleanVariantId,
      availableForSale: available,
      quantityAvailable: quantity,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch live inventory" },
      { status: 500 }
    );
  }
}
