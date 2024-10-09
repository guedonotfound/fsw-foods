import Header from "../_components/desktop/header";
import MainBanner from "../_components/desktop/main-banner";
import CategoryList from "../_components/desktop/category-list";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import ProductList from "../_components/desktop/product-list";
import { db } from "../_lib/prisma";
import PromoBanner from "../_components/mobile/promo-banner";
import RestaurantList from "../_components/desktop/restaurant-list";

const DesktopHomePage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    orderBy: {
      discountPercentage: "desc",
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const restaurants = await db.restaurant.findMany({
    take: 10,
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return (
    <div className="mb-10">
      <Header isHomePage />
      <div className="space-y-10">
        <MainBanner />

        <CategoryList />

        <div className="flex items-center justify-between px-[8.89%]">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button variant="link" className="h-fit p-0" asChild>
            <Link href="products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
        <div className="flex h-[215px] justify-center gap-[1.39%]">
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </div>
        <div className="flex items-center justify-between px-[8.89%]">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button variant="link" className="h-fit p-0" asChild>
            <Link href="products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList restaurants={restaurants} />
      </div>
    </div>
  );
};

export default DesktopHomePage;
