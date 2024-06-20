import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col p-5 ">
        <Skeleton className="flex h-[380px] w-full items-center justify-center lg:px-36" />
        <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:gap-2 lg:px-20">
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[100px] items-center justify-center rounded-lg" />
      </div>
      <div className="mt-5 flex flex-col gap-1 lg:hidden">
        <Skeleton className="flex h-[24px] w-[200px] items-center justify-center rounded-lg" />
        <Skeleton className="flex h-[16px] w-[100px] items-center justify-center rounded-lg" />
        <Skeleton className="flex h-[10px] w-[100px] items-center justify-center rounded-lg" />
      </div>
      <div className="lg:hidden">
        <Skeleton className="mt-5 flex h-[30px] w-[100px] rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
