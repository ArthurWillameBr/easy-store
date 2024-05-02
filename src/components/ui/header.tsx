"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Package,
  PercentIcon,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "./sheet";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Separator } from "./separator";
import Link from "next/link";
import { Cart } from "./cart";

export function Header() {
  const handleLoginCLick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  const { status, data } = useSession();

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-xl font-semibold ">
            Menu
          </SheetHeader>
          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-2">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginCLick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}
            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Inicio
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Package size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>


            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <h1 className="text-lg font-semibold lg:text-xl ">
          {" "}
          <span className="text-primary">Easy </span>Store
        </h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCart />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px] lg:w-[600px] lg:max-w-[600px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
}
