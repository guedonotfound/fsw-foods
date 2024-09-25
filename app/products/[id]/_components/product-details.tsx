"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { CartContext } from "@/app/_context/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const [isSubmitingLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  const router = useRouter();

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    router.push(`/restaurants/${product.restaurantId}`);
  };

  const handleAddToCartClick = () => {
    setIsSubmitLoading(true);
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) return setIsConfirmationDialogOpen(true);

    addToCart({
      emptyCart: false,
    });

    setIsSubmitLoading(false);

    router.push(`/restaurants/${product.restaurantId}`);
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-[6px] px-5">
          <div className="relative h-6 w-6 object-cover">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        {/* NOME DO PRODUTO */}
        <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

        {/* PREÇO E QUANTIDADE */}
        <div className="flex justify-between px-5">
          {/* PREÇO COM DESCONTO */}
          <div>
            <div className="flex items-center gap-[5px]">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {/* PREÇO ORIGINAL */}
            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center text-center">
            <Button
              variant="ghost"
              size="icon"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-10">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DADOS DA ENTREGA */}
        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        {/* DESCRIÇÃO */}
        <div className="spcace-y-3 mt-6 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-justify text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="spcace-y-3 mt-6">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
            disabled={isSubmitingLoading}
          >
            {isSubmitingLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja esvaziar a sacola e adicionar este item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
