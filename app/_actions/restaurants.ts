"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const isFavorite = await db.userFavoriteRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.userFavoriteRestaurants.deleteMany({
      where: {
        userId,
        restaurantId,
      },
    });

    revalidatePath("/");
    return;
  }

  await db.userFavoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
