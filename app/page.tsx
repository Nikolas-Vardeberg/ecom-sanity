import ProductGrid from "@/components/ProductGrid";
import { PRODUCT_QUERY } from "@/queries/product.queries";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const products = await client.fetch(PRODUCT_QUERY);
  
  return (
    <>
    <ProductGrid products={products} />
    <pre>
      {JSON.stringify(products, null, 2)}
    </pre>
    </>
  );
}
