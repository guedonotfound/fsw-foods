import { getServerSession } from "next-auth";
import { db } from "../../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({
    take: 10,
    include: {
      _count: {
        select: { orders: true },
      },
    },
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
  });
  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: { userId: session?.user?.id },
  });
  return (
    <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
