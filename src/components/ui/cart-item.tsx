import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

export const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, incrementProductQuantity } =
    useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };
  const handleIncreaseProductQuantityClick = () => {
    incrementProductQuantity(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="items0-center flex gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            alt={product.name}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{product.totalPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeft size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button size="icon" variant="outline">
        <Trash size={16} />
      </Button>
    </div>
  );
};
