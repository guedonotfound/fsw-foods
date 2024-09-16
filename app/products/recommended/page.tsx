import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
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
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;
