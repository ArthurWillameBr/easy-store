import Image from "next/image"
import {cn} from "@/lib/utils"
import { ImageProps } from "next/image"
export const PromoBanner = ({alt, className, ...props}: ImageProps) => {
    return(
        <Image
        width={0}
        height={0}
        className={cn("h-auto w-full px-5", className)}
        sizes="100vw"
        alt={alt}
        {...props}
      />
    )
}