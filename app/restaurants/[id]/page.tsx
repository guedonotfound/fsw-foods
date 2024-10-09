import DesktopRestaurantPage from "./desktop/page";
import MobileRestaurantPage from "./mobile/page";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: RestaurantPageProps) => {
  return (
    <>
      <div className="block 2md:hidden">
        <MobileRestaurantPage params={{ id }} />
      </div>
      <div className="hidden 2md:block">
        <DesktopRestaurantPage params={{ id }} />
      </div>
    </>
  );
};

export default RestaurantPage;
