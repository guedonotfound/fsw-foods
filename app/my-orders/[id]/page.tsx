import { db } from "@/app/_lib/prisma";
import ProductList from "../_components/product-list";
import { notFound } from "next/navigation";

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

  if (!order) return notFound();

  return (
    <>
      <ProductList products={order.products} />
    </>
  );
};

export default OrderDetailsPage;
