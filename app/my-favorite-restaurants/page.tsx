import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import RestaurantItem from "../_components/mobile/restaurant-item";
import Header from "../_components/mobile/header";

const FavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return notFound();

  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes favoritos</h2>
        <div className="flex flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não favoritou nenhum restaurante.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteRestaurants;
