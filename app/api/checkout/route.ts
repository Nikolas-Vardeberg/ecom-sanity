import { CartItem } from "@/providers/cart-context";
import { urlFor } from "@/sanity/lib/image";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
    try {
        const { items } = await req.json();

        const lineItems = items.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [urlFor(item.mainImage).url()],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ['NO'],
            },
            billing_address_collection: 'required',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
            cancel_url : `${process.env.NEXT_PUBLIC_SITE_URL}`,
        })

        return NextResponse.json({
            sessionId: session.id,
        })
    } catch (error: unknown) {
        console.log("Error", error);

        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        )
    }
}