import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurants";

interface useToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsCurrentlyFavorite?: boolean;
  onSucsess?: () => void;
  onError?: () => void;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsCurrentlyFavorite,
}: useToggleFavoriteRestaurantProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsCurrentlyFavorite ? "Removido dos favoritos" : "Favoritado",
      );
    } catch (error) {
      toast.error("Erro ao favoritar ou remover dos favoritos");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
