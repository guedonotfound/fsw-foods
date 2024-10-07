import { ArrowDownIcon } from "lucide-react";
import { Product } from "@prisma/client";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center rounded-full bg-primary pl-1 pr-2 text-white">
      <ArrowDownIcon size={20} />
      <span className="font-semibold">{product.discountPercentage}%</span>
    </div>
  );
};

export default DiscountBadge;
