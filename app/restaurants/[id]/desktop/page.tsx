import Header from "@/app/_components/desktop/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import RestaurantImage from "../_components/desktop/restaurant-image";
import Image from "next/image";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const DesktopRestaurantPage = async ({
  params: { id },
}: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) return notFound();

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <Header />
      <div className="my-10 px-[8.89%]">
        <div className="flex w-full items-start justify-center gap-[2.22%]">
          <div className="h-[380px] w-[63.34%]">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="relative h-8 w-8 object-cover">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full"
              />
            </div>
            <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopRestaurantPage;
