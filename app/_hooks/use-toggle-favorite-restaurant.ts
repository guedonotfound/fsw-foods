import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurants";
import { UserFavoriteRestaurants } from "@prisma/client";
import { useRouter } from "next/navigation";

interface useToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteRestaurants?: UserFavoriteRestaurants[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: useToggleFavoriteRestaurantProps) => {
  const router = useRouter();
  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast(restaurantIsFavorited ? "Removido dos favoritos" : "Favoritado", {
        action: {
          label: "Ver favoritos",
          onClick: () => router.push("/my-favorite-restaurants"),
        },
      });
    } catch (error) {
      toast.error("Erro ao favoritar ou remover dos favoritos");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
