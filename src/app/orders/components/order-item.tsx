import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { OrderProductItem } from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";

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
              <p> Pedido com {order.orderProducts.length} produto(s)</p>
              <span className="text-sm opacity-60">
                Feito em {format(order.createdAt, "dd/MM/y 'às' HH:mm ")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162ff]">{order.status}</p>
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-65">
                    {format(order.createdAt, "dd/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
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
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px]">
                  <p>Entrega</p>
                  <p>Grátis</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px]">
                  <p>Descontos</p>
                  <p>-R$ {totalDiscounts.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-[12px] text-sm font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
