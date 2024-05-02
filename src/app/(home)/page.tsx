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
      <div className="mx-auto max-w-[1920px]">
        <Image
          src="/bannerDiscountDesktop.png"
          alt="até 55% de desconto esse mês"
          className="hidden h-auto w-full lg:block"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <PromoBanner
          src="/bannerDiscount.png"
          alt="até 55% de desconto esse mês"
          className="lg:hidden"
        />

        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>
        <div className="flex flex-col lg:flex-row">
          <PromoBanner
            src="/bannerMouses.png"
            alt="até 55% de desconto em mouses"
          />
        </div>
        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <PromoBanner
          src="/bannerFones.png"
          alt="até 20% de desconto em fones"
        />
        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
}
