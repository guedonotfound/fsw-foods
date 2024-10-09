import { Prisma } from "@prisma/client";
import ProductsCarousel from "./products-carousel";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return <ProductsCarousel products={products} delay={5000} />;
};

export default ProductList;
