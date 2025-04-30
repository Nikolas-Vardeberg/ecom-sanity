import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold">Payment Received!</h1>
            <p className="text-gray-700">Your order confirmation has been sent to your email.</p>
            <Button>
                <Link href="/">
                    Continue Shopping
                </Link>
            </Button>
        </div>
    </div>
  );
}