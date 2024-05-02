import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "../../components/ui/product-list";
import { SectionTitle } from "../../components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";
import Image from "next/image";

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
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <>
      <div className="max-w-[1920px] mx-auto">
      <Image
        src="/bannerDiscountDesktop.png"
        alt="até 55% de desconto esse mês"
        className="hidden h-auto w-full lg:block"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="container mx-auto flex flex-col gap-8 py-8">
      <PromoBanner
        src="/bannerDiscount.png"
        alt="até 55% de desconto esse mês"
        className="lg:hidden"
      />
     </div>
     
      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/bannerMouses.png"
        alt="até 55% de desconto em mouses"
      />
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner src="/bannerFones.png" alt="até 20% de desconto em fones" />
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
      </div>
    </>
  );
}
