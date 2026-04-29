import { medusa } from "./medusa";

export async function getProducts(params?: { category?: string; limit?: number }) {
  try {
    const query: Record<string, unknown> = {
      limit: params?.limit || 50,
      fields: "+variants.calculated_price",
    };
    if (params?.category) {
      query["category_id[]"] = params.category;
    }
    const { products } = await medusa.store.product.list(query);
    return products;
  } catch {
    return [];
  }
}

export async function getProduct(handle: string) {
  try {
    const { products } = await medusa.store.product.list({ handle });
    return products[0] || null;
  } catch {
    return null;
  }
}

export async function getCart(cartId: string) {
  try {
    const { cart } = await medusa.store.cart.retrieve(cartId);
    return cart;
  } catch {
    return null;
  }
}

export async function createCart() {
  const { cart } = await medusa.store.cart.create({ region_id: "reg_india" });
  return cart;
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  });
  return cart;
}
