"use client";

import { useContext, useState } from "react";
import { CartContext } from "../../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "../../_helpers/price";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createOrder } from "../../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  console.log(setIsOpen);
  const [isSubmitingLoading, setIsSubmitLoading] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const router = useRouter();
  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: data.user.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
              price: product.price,
              discountPercentage: product.discountPercentage,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);
      toast("Pedido realizado", {
        description: "O pedido foi enviado ao restaurante",
        action: {
          label: "Ver pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleGoToRestaurantClick = () =>
    router.push(`/restaurants/${products[0].restaurantId}`);

  return (
    <>
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
              {/* BOTÃO CONFIRMAR */}
              <Button
                className="mt-2 w-full"
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={isSubmitingLoading}
              >
                {isSubmitingLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Finalizar pedido
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-medium">Sua sacola está vazia.</h2>
            <Button onClick={() => setIsOpen(false)} className="mt-10">
              Fechar
            </Button>
          </>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
