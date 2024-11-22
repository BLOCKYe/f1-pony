import { Skeleton } from '@/components/ui/skeleton';
import Flex from '@/components/wrappers/Flex';
import { useGetDriversStandings } from '@/modules/standings/api/queries';
import DriverItem from '@/modules/standings/components/DriverItem';
import useDifferenceType from '@/utils/useDifferenceType';
import { useMemo } from 'react';

const DriversStandings = () => {
  const { data, isLoading } = useGetDriversStandings();
  const { RenderFilters, differenceType } = useDifferenceType();

  /**
   * Renders list
   */
  const renderList = useMemo(() => {
    if (isLoading) return Array.from({ length: 22 }).map((_, idx) => <Skeleton key={idx} className={'h-[22px]'} />);

    if (!data) return <p>No data.</p>;

    return data?.map((item) => <DriverItem key={item?.id} {...item} differenceType={differenceType} />);
  }, [data, differenceType, isLoading]);

  return (
    <div className={'rounded-md border p-3 md:p-5 bg-primary-foreground md:max-h-[410px] md:overflow-y-auto'}>
      <Flex className={'justify-between'}>
        <p>Drivers</p>
        <RenderFilters />
      </Flex>

      <div className={'mt-5 grid gap-3'}>{renderList}</div>
    </div>
  );
};

export default DriversStandings;
