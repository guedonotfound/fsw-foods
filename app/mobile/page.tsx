import CategoryList from "../_components/mobile/category-list";
import Header from "../_components/mobile/header";
import Search from "../_components/mobile/search";
import ProductList from "../_components/mobile/product-list";
import { Button } from "../_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import PromoBanner from "../_components/mobile/promo-banner";
import RestaurantList from "../_components/mobile/restaurant-list";
import Link from "next/link";

const MobileHomePage = async () => {
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

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button variant="link" className="h-fit p-0" asChild>
            <Link href="products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button variant="link" className="h-fit p-0" asChild>
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <div className="pb-6">
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default MobileHomePage;
