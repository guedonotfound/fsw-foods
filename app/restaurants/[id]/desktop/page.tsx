import Header from "@/app/_components/desktop/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import RestaurantImage from "../_components/desktop/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/mobile/delivery-info";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import ProductList from "@/app/_components/desktop/product-list";

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
      <div className="my-10 w-full space-y-10 px-[8.89%]">
        <div className="flex w-full items-start justify-center gap-[2.22%]">
          <div className="h-max w-[63.34%]">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>
          <div className="w-[27.92%] space-y-[18px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <div className="relative h-6 w-6 object-cover">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>
              <div className="flex h-full items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>
            <DeliveryInfo restaurant={restaurant} />
            <ScrollArea>
              <div className="flex h-7 gap-4">
                {restaurant.categories.map((category) => (
                  <div
                    key={category.id}
                    className="h-6 min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                  >
                    <span className="text-xs text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="spcace-y-3 mt-3">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-justify text-sm text-muted-foreground">
                {restaurant.products[0].description}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 px-[3%]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Mais pedidos</h2>
            <ProductList products={restaurant.products} />
          </div>
          {restaurant.categories.map((category) => (
            <div className="space-y-4" key={category.id}>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <ProductList products={category.products} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesktopRestaurantPage;
