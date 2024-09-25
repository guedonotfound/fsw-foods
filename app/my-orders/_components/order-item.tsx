"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import {
  BikeIcon,
  CheckCircle,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import ProductList from "./product-list";
import Link from "next/link";

interface OrderItemProps {
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

const getOrderStatus = (status: OrderStatus) => {
  const size = 14;
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmado",
        color: "bg-blue-400",
        icon: <CheckCircle size={size} />,
      };
    case "PREPARING":
      return {
        label: "Preparando",
        color: "bg-orange-400",
        icon: <ClockIcon size={size} />,
      };
    case "DELIVERING":
      return {
        label: "Em transporte",
        color: "bg-yellow-400",
        icon: <BikeIcon size={size} />,
      };
    case "COMPLETED":
      return {
        label: "Finalizado",
        color: "bg-green-500",
        icon: <ClipboardCheckIcon size={size} />,
      };
    case "CANCELED":
      return {
        label: "Cancelado",
        color: "bg-red-500",
        icon: <XCircleIcon size={size} />,
      };
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const orderStatus = getOrderStatus(order.status);

  const diasAbreviados: { [key: string]: string } = {
    "segunda-feira": "Seg.",
    "terça-feira": "Ter.",
    "quarta-feira": "Qua.",
    "quinta-feira": "Qui.",
    "sexta-feira": "Sex.",
    sábado: "Sáb.",
    domingo: "Dom.",
  };

  const customFormat = (date: Date) => {
    const diaCompleto = format(date, "EEEE", { locale: ptBR }).toLowerCase();
    const diaAbreviado = diasAbreviados[diaCompleto] || diaCompleto;
    return `${diaAbreviado} ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
  };

  const handleRedoOrder = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
      });
    }
    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5 pt-3">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="link" size="icon" className="h-5 w-5 text-black">
            <Link href={`/my-orders/${order.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`flex h-5 w-fit items-center gap-1 rounded-full px-2 text-white ${orderStatus.color}`}
          >
            {orderStatus.icon}
            <span className="block text-xs font-semibold">
              {orderStatus.label}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {customFormat(new Date(order.createdAt))}
          </span>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <ProductList products={order.products} />

        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </p>
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrder}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
