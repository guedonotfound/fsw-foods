"use client";

import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderDetailsProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const handleRedoOrder = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurants/${order.restaurantId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-3">
        <Button
          className="rounded-full bg-white text-foreground hover:text-white"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Detalhes do pedido</h3>
        </div>
      </div>

      <div className="py-6">
        <div className="flex gap-3">
          <div className="relative h-16 w-16 object-cover">
            <Image
              src={order.restaurant.imageUrl}
              alt={order.restaurant.name}
              fill
              className="rounded-full"
            />
          </div>
          <div className="space-y-0">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">{order.restaurant.name}</h3>
              <Button variant="link" className="h-5 w-24" asChild>
                <Link href={`/restaurants/${order.restaurantId}`}>
                  <span className="text-xs">Ver cardápio</span>
                </Link>
              </Button>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">
              Pedido nº {order.id.replace(/\D/g, "")}
            </h3>
            <h3 className="text-sm text-muted-foreground">
              {format(new Date(order.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </h3>
          </div>
        </div>

        <div className="py-6">
          <Separator />
        </div>

        <div className="space-y-3">
          {order.products.map((product) => (
            <div key={product.product.id} className="flex gap-3">
              <div className="relative flex h-16 min-w-16 object-cover">
                <Image
                  src={product.product.imageUrl}
                  alt={product.product.name}
                  fill
                  className="rounded-lg"
                />

                <div className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                  <span className="block text-xs text-white">
                    {product.quantity}
                  </span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div>
                  <h3 className="font-semibold">{product.product.name}</h3>
                  <h3 className="text-sm">
                    {formatCurrency(Number(product.product.price))}
                  </h3>
                </div>

                <h3>
                  {formatCurrency(
                    Number(product.product.price) * product.quantity,
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <h3 className="font-semibold">Resumo dos valores</h3>
          <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatCurrency(Number(order.subtotalPrice))}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Descontos</span>
            <span>-{formatCurrency(Number(order.totalDiscounts))}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Taxa de entrega</span>
            {Number(order.deliveryFee) === 0 ? (
              <span className="text-xs uppercase text-primary underline">
                Grátis
              </span>
            ) : (
              <span>{formatCurrency(Number(order.deliveryFee))}</span>
            )}
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(Number(order.totalPrice))}</span>
          </div>
        </div>
        <div className="py-6">
          <Separator />
        </div>
        <Button className="w-full" onClick={handleRedoOrder} variant="link">
          Adicionar à sacola
        </Button>
        <div className="py-6">
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
