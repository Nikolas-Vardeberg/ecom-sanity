import ProductAction from "@/components/ProductAction";
import ProductQuantity from "@/components/ProductQuantity";
import { PRODUCT_SLUG_QUERY } from "@/queries/product.queries";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { QueryParams } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: {
          slug: string;
      };
};

const getHook = async ({ params }: { params: QueryParams }) => {
    return await sanityFetch({ query: PRODUCT_SLUG_QUERY, params: { ...params } });
}

export default async function Page(props: Props) {
    const params = await props.params;
    const initial = await getHook({ params });

    const product = initial.data;

    return(
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-lg font-medium mb-6 hover:text-gray-600"
                >
                    Back
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="aspect-auto rounded-lg overflow-hidden flex items-center justify-center h-[80vh]">
                            <Image 
                                src={urlFor(product.mainImage).url()}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="max-w-full max-h-full object-contain"
                                priority
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h1 className="text-2xl font-bold">{product.title}</h1>

                                <ProductQuantity product={product} />

                                <div className="text-2xl font-bold">${product.price}</div>    
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <ProductAction />
                    </div>
                </div>
            </div>
        </div>       
    )
}