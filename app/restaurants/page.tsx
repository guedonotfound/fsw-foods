"use client";

import { notFound, useSearchParams } from "next/navigation";
import { searchForRestaurants } from "./_actions/search";
import { Suspense, useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
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
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          {`Resultados para: "${searchFor}"`}
        </h2>
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Envolvendo o componente em Suspense
export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Restaurants />
    </Suspense>
  );
}
