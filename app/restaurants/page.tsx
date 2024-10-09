import DesktopRestaurantsPage from "./desktop/page";
import MobileRestaurantsPage from "./mobile/page";

const RestaurantsPage = () => {
  return (
    <div>
      <div className="block 2md:hidden">
        <MobileRestaurantsPage />
      </div>
      <div className="hidden 2md:block">
        <DesktopRestaurantsPage />
      </div>
    </div>
  );
};

export default RestaurantsPage;
