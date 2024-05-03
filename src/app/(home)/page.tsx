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
            src="/BannerDesktopComprimido.png"
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
            src="/BannerMobile.png"
            alt="até 55% de desconto esse mês"
            className="lg:hidden"
          />
        </Link>
        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="lg:pl-0 pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>
        <div className="flex flex-col lg:flex-row">
         
        
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="lg:pl-0 pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>
        <div>
         
          
          
        </div>
        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="lg:pl-0 pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
}
