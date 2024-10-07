"use client";

import { Prisma } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductItem from "../mobile/product-item";
import Autoplay from "embla-carousel-autoplay";

interface ProductsCarouselProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
  delay?: number;
}

const ProductsCarousel = ({ products, delay }: ProductsCarouselProps) => {
  return (
    <>
      {delay ? (
        <Carousel
          opts={{ align: "start" }}
          className="px-[8.89%]"
          plugins={[Autoplay({ delay: delay })]}
        >
          <CarouselContent>
            {products.map((product) => (
              <div key={product.id} className="gap-3">
                <CarouselItem>
                  <ProductItem key={product.id} product={product} />
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Carousel opts={{ align: "start" }} className="px-[8.89%]">
          <CarouselContent>
            {products.map((product) => (
              <div key={product.id} className="gap-3">
                <CarouselItem>
                  <ProductItem key={product.id} product={product} />
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};

export default ProductsCarousel;
