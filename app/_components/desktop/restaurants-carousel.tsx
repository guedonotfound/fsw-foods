"use client";

import { Prisma } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import RestaurantItem from "../desktop/restaurant-item";

interface RestaurantsCarouselProps {
  restaurants: Prisma.RestaurantGetPayload<{
    include: {
      _count: {
        select: {
          orders: true;
        };
      };
    };
    take: 10;
  }>[];
}

const RestaurantsCarousel = ({ restaurants }: RestaurantsCarouselProps) => {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="mx-[8.89%]"
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="gap-3">
            <CarouselItem>
              <div className="h-[222px] w-[381px]">
                <RestaurantItem
                  restaurant={restaurant}
                  userFavoriteRestaurants={[]}
                />
              </div>
            </CarouselItem>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RestaurantsCarousel;
