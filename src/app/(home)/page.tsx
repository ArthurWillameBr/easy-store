import Image from "next/image";
import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "./components/product-list";
import { SectionTitle } from "./components/section-title";
import { PromoBanner } from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    }
  })

  const fones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "fones"
      }
    }
  
  })

  return (
    <div className="flex flex-col gap-8">
      <PromoBanner
        src="/bannerDescont.png"
        alt="até 55% de desconto esse mês"
      />
      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/Banner-mouses.png"
        alt="até 55% de desconto em mouses"
      />
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/Banner-fones.png"
        alt="até 55% de desconto em mouses"
      />
      <div>
        <SectionTitle>Fones</SectionTitle>
        <ProductList products={fones} />
      </div>
    </div>
  );
}
