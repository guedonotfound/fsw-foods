import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Restaurants from "../_components/desktop/restaurants";
import { db } from "@/app/_lib/prisma";

const DesktopRestaurantsPage = async () => {
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

export default DesktopRestaurantsPage;
