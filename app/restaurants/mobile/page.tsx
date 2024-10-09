import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Restaurants from "../_components/mobile/restaurants";
import { db } from "@/app/_lib/prisma";

const MobileRestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
};

export default MobileRestaurantsPage;
