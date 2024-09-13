import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_component/product-image";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />
      <div className="p-5">
        <div className="flex items-center gap-[6px]">
          <div className="relative h-6 w-6 object-cover">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
        <div className="flex justify-between">
          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-[5px]">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              <div className="flex h-full items-center rounded-full bg-primary pl-1 pr-2 text-white">
                <ArrowDownIcon size={20} />
                <span className="font-semibold">
                  {product.discountPercentage}%
                </span>
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-semibold">
              {formatCurrency(Number(product.price))}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
