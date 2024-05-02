import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "../../components/ui/product-list";
import { SectionTitle } from "../../components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";
import Image from "next/image";
import Link from "next/link";

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
        <Link href="/deals">
          <Image
            src="/BannerDiscountDesktop.png"
            alt="até 55% de desconto esse mês"
            className="hidden h-auto w-full lg:block"
            width={0}
            height={0}
            sizes="100vw"
          />
        </Link>
      </div>
      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <Link href="/deals">
          <PromoBanner
            src="/bannerDiscount.png"
            alt="até 55% de desconto esse mês"
            className="lg:hidden"
          />
        </Link>

        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>
        <div className="flex flex-col lg:flex-row">
          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src="/bannerMouses.png"
              alt="até 55% de desconto em mouses"
              className="w-0 flex-1"
            />
          </Link>
          <Link href="/category/headphones" className="flex flex-1">
            <PromoBanner
              src="/bannerFones.png"
              alt="até 20% de desconto em fones"
              className="hidden w-0 flex-1 lg:block"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>
        <div>
          <Link href="/category/headphones">
            <PromoBanner
              src="/bannerFones.png"
              alt="até 20% de desconto em fones"
              className="lg:hidden"
            />
          </Link>
          <Link href="/catalog">
            <PromoBanner
              src="/bannerFreeShipping.png"
              alt="Frete grátis para todo Brasil"
              className="hidden lg:block"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
}
