import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import OrderDetails from "./_components/order-details";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

const OrderDetailsPage = async ({ params: { id } }: OrderDetailsPageProps) => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  console.log(order);

  if (!order) return notFound();

  return (
    <>
      <OrderDetails order={order} />
    </>
  );
};

export default OrderDetailsPage;
