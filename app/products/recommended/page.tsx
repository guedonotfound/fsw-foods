import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: true,
    },
    orderBy: {
      discountPercentage: "desc",
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;
