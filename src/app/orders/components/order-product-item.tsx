import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";
import { computeProductTotalPrice } from "@/helpers/product";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

export const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex rounded bg-accent px-2 py-[2px] w-fit">
          <p className="text-[10px]">
            Vendido e entregue por <span className="font-bold">Easy Store</span>
          </p>
        </div>

        <p className="text-sm">{orderProduct.product.name}</p>

        <div className="flex items-center w-full justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R$ {productWithTotalPrice.totalPrice.toFixed(2)}
            </p>
            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <p className="opacity-65 text-xs">Qtd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};
