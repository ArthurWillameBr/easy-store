import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "./sheet";

export function Header() {
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

          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogInIcon size={16} />
              Fazer Login
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              Inicio
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
          </div>
          
        </SheetContent>
      </Sheet>
      <h1 className="text-lg font-semibold ">
        {" "}
        <span className="text-primary">Easy </span>Store
      </h1>
      <Button size="icon" variant="outline">
        <ShoppingCart />
      </Button>
    </Card>
  );
}
