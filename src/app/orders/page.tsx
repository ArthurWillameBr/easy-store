import { Badge } from "@/components/ui/badge"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/prisma"
import { Package } from "lucide-react"
import { getServerSession } from "next-auth"
import { OrderItem } from "./components/order-item"

const OrderPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return <p>Access Denied</p>;
        return (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
            <h2 className="font-bold">Acesso Negado!</h2>
            <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
          </div>
        );
      }

    const orders = await prismaClient.order.findMany({
        where: {
            userId: session.user.id,
          },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return (
        <div className="p-5">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant="outline"
            >
                <Package size={16} />
                MEUS PEDIDOS
            </Badge>

            <div className="flex flex-col gap-5 mt-4">
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} /> 
            ))}
            </div>
        </div>
    );
};


export default OrderPage