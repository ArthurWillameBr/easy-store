import { MenuIcon, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export function Header() {
  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
        <h1 className="font-semibold text-lg "> <span className="text-primary">Easy</span>Store</h1>
        <Button size="icon" variant="outline">
          <ShoppingCart />
        </Button>
    </Card>
  );
}
