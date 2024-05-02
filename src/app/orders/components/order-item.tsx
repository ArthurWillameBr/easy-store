import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { OrderProductItem } from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface OrderItemPros {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

export const OrderItem = ({ order }: OrderItemPros) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product.product);
      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscounts = subtotal - total;
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase lg:text-base">
                {" "}
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-xs opacity-60 lg:text-sm">
                Feito em {format(order.createdAt, "dd/MM/y 'às' HH:mm ")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p className="text-sm lg:text-base">Status</p>
                  <p className="text-[#8162ff] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold lg:text-base">Data</p>
                  <p className="opacity-65 lg:text-sm">
                    {format(order.createdAt, "dd/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold lg:text-base">Pagamento</p>
                  <p className="opacity-65">Cartão</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>
              <div className="fap-1 flex w-full flex-col text-xs">
                <Separator />
                <div className="flex w-full justify-between py-[12px]">
                  <p className="text-sm lg:text-base">Subtotal</p>
                  <p className="text-sm lg:text-base">
                    R$ {subtotal.toFixed(2)}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px]">
                  <p className="text-sm lg:text-base">Entrega</p>
                  <p className="text-sm lg:text-base">Grátis</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px]">
                  <p className="text-sm lg:text-base">Descontos</p>
                  <p className="text-sm lg:text-base">
                    -R$ {totalDiscounts.toFixed(2)}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px] text-sm font-bold">
                  <p className="text-base lg:text-lg">Total</p>
                  <p className="text-base lg:text-lg">R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
