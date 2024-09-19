"use client";

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react"; // Importe isso para tipagem
import { useRouter } from "next/navigation";

interface CartProps {
  setIsCartOpen?: Dispatch<SetStateAction<boolean>>; // Defina o tipo para setIsCartOpen
}

const Cart: React.FC<CartProps> = ({ setIsCartOpen }) => {
  const router = useRouter();
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  const handleGoToRestaurantClick = () =>
    router.push(`/restaurants/${products[0].restaurantId}`);

  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="h-px flex-auto space-y-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <Button
            onClick={handleGoToRestaurantClick}
            className="mt-2 w-full border border-solid border-muted-foreground"
            variant="ghost"
          >
            Ir para o restaurante
          </Button>

          {/* TOTAIS */}
          <div className="mt-6 h-[209px]">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="text-xs uppercase text-primary underline">
                      Grátis
                    </span>
                  ) : (
                    <span>
                      {formatCurrency(
                        Number(products?.[0].restaurant?.deliveryFee),
                      )}
                    </span>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
            <Button className="mt-2 w-full">Finalizar pedido</Button>
            {/* BOTÃO CONFIRMAR */}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-medium">Sua sacola está vazia.</h2>
          <Button
            onClick={() => setIsCartOpen && setIsCartOpen(false)}
            className="mt-10"
          >
            Fechar
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
