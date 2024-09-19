import { Skeleton } from '@/components/ui/skeleton';

const DriverItemDetailsSkeleton = () => {
  return (
    <div className={'grid gap-3'}>
      <div className={'grid lg:grid-cols-4 gap-3'}>
        <Skeleton className={'h-[134px]'} />
        <Skeleton className={'h-[134px]'} />
        <Skeleton className={'h-[134px]'} />
        <Skeleton className={'h-[134px]'} />
      </div>

      <div className={'mt-10'}>
        <Skeleton className={'h-[28px] w-[120px]'} />
        <Skeleton className={'h-[21px] w-[260px] mt-2'} />
        <Skeleton className={'h-[300px] mt-5'} />
      </div>

      <div className={'mt-10'}>
        <Skeleton className={'h-[28px] w-[120px]'} />
        <Skeleton className={'h-[21px] w-[260px] mt-2'} />
        <Skeleton className={'h-[1083px] mt-5'} />
      </div>

      <div className={'mt-10'}>
        <Skeleton className={'h-[28px] w-[120px]'} />
        <Skeleton className={'h-[21px] w-[260px] mt-2'} />
        <Skeleton className={'h-[840px] mt-5'} />
      </div>
    </div>
  );
};

export default DriverItemDetailsSkeleton;
