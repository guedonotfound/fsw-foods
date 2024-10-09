"use client";

import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../../_actions/search";
import Header from "@/app/_components/desktop/header";
import RestaurantItem from "@/app/_components/desktop/restaurant-item";

interface RestaurantsProps {
  userFavoriteRestaurants: UserFavoriteRestaurants[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantsProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />
      <div className="px-[8.89%] py-10">
        <h2 className="mb-6 text-xl font-semibold">
          {`Resultados para: "${searchFor}"`}
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
