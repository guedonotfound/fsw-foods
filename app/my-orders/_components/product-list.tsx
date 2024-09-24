interface ProductListProps {
  products: {
    id: string;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-2 py-[2px]">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
            <span className="block text-xs text-white">{product.quantity}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.product.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default ProductList;
