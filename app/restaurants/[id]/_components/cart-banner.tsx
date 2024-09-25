"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  // eslint-disable-next-line no-unused-vars
  const [, setIsOpen] = useState(false);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted-foreground bg-[#F5F5F5] p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* PREÇO */}
        <div className="">
          {" "}
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / {totalQuantity} {totalQuantity === 1 ? "item" : "itens"}
            </span>
          </h3>
        </div>

        {/* BOTÃO */}
        <Sheet>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="flex w-[85vw] flex-col">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <div className="flex-auto">
              <Cart setIsOpen={setIsOpen} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
