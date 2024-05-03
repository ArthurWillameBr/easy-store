import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

export const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    incrementProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };
  const handleIncreaseProductQuantityClick = () => {
    incrementProductQuantity(product.id);
  };

  const handleRemoveProductFromCartClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="items0-center flex gap-4">
        <div className="flex size-[77px] items-center  justify-center rounded-lg bg-accent lg:size-28">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            alt={product.name}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-xs font-semibold lg:text-base">{product.name}</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <p className="text-sm font-bold lg:text-base">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 lg:gap-3">
            <Button
              size="icon"
              variant="outline"
              className="size-8 lg:size-9"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeft className="size-4 lg:size-5" />
            </Button>

            <span className="font-semibold text-sm lg:text-sm">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="size-8 lg:size-9"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRight className="size-4 lg:size-5" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="hover:text-red-600 size-9"
        onClick={handleRemoveProductFromCartClick}
      >
        <Trash className="size-4 lg:size-5 " />
      </Button>
    </div>
  );
};
