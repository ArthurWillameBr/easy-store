import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col p-5">
        <Skeleton className="flex h-[380px] w-full items-center justify-center" />
        <div className="mt-8 grid grid-cols-4 gap-4 px-5">
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
        </div>
        <div className="flex flex-col mt-5 gap-1">
            <Skeleton className="flex w-[200px] h-[24px] items-center justify-center rounded-lg"/>
            <Skeleton className="flex w-[88px] h-[16px] items-center justify-center rounded-lg"/>
            <Skeleton className="flex w-[70px] h-[10px] items-center justify-center rounded-lg"/>
        </div>

        <div className="flex gap-2 my-4">
            <Skeleton className="flex w-[40px] h-[40px] items-center justify-center rounded-lg"/>
            <div className="flex items-center justify-center">
                <Skeleton className="flex w-[8px] h-[22px] items-center justify-center rounded-lg"/>
            </div>
            <Skeleton className="flex w-[40px] h-[40px] items-center justify-center rounded-lg"/>
        </div>
      </div>
    )
}

export default Loading;