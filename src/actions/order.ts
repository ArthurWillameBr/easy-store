"use server"

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";
import { User } from "@prisma/client";

export const createOrder = async(cartProducts: CartProduct[], userId: string) => {

   const order = await prismaClient.order.create({
        data: {
            userId,
            status: "WAITING_FOR_PAYMENT",
                orderProducts: {
                    createMany: {
                        data:  cartProducts.map((product) => ({
                            basePrice: product.basePrice,
                            quantity: product.quantity,
                            discountPercentage: product.discountPercentage,
                            productId: product.id
                        }))
                    }
                }    
        }
    })
    return order
}