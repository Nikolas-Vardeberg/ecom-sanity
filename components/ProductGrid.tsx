import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
    products: any[];
}

const ProductGrid = ({ products }: Props) => {
    return(
        <div className="min-h-screen bg-white">
             <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40">
                    {products.map((product, index) => (
                        <Link
                            href={`/product/${product.slug.current}`}
                            key={index}
                            className="flex flex-col group relative"
                        >
                            <div className="aspect-square rounded-md overflow-hidden">
                                <Image 
                                    src={urlFor(product.mainImage).url()}
                                    alt={product.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-base font-semibold text-primary">{product.title}</h3>
                                    <p className="text-base font-semibold text-primary">${product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default ProductGrid