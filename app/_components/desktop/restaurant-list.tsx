import { Prisma } from "@prisma/client";
import RestaurantsCarousel from "./restaurants-carousel";

interface RestaurantListProps {
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

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
  return <RestaurantsCarousel restaurants={restaurants} />;
};

export default RestaurantList;
