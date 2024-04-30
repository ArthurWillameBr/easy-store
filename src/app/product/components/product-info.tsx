"use client";
import { useContext, useState } from "react";
import { ProductWithTotalPrice } from "@/helpers/product";
import {ArrowLeft, ArrowRight, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/providers/cart";
import { DiscountBadge } from "@/components/ui/discount-badge";

interface ProductInfoPros {
  product: ProductWithTotalPrice;
}

export const ProductInfo = ({ product }: ProductInfoPros) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddProductToCart = () => {
    addProductToCart({
      ...product,
      quantity,
    });
  };
  return (
    <div className="flex flex-col px-5">
      <h1 className="text-lg">{product.name}</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <div className="flex items-center">
          <p className="text-sm opacity-75 ">
            De:{" "}
            <span className="text-sm line-through opacity-75">
              {" "}
              R${Number(product.basePrice).toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeft size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityQuantityClick}
        >
          <ArrowRight size={16} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>
      <Button
        className="mt-8 font-semibold uppercase"
        onClick={handleAddProductToCart}
      >
        Adicionar ao carrinho
      </Button>
      <div className="mt-5 flex justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold italic">ESPacket®</span>
            </p>
            <p className="text-xs text-[#8162ff]">
              Envio para <span className="font-bold">todo Brasil</span>{" "}
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};
