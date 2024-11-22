import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Flex from '@/components/wrappers/Flex';
import { useGetConstructorsStandings } from '@/modules/standings/api/queries';
import useDifferenceType from '@/utils/useDifferenceType';
import { useMemo } from 'react';

const ConstructorsStandings = () => {
  const { data, isLoading } = useGetConstructorsStandings();
  const { RenderFilters, differenceType } = useDifferenceType();

  /**
   * Renders list
   */
  const renderList = useMemo(() => {
    if (isLoading) return Array.from({ length: 10 }).map((_, idx) => <Skeleton key={idx} className={'h-[22px]'} />);

    if (!data) return <p>No data.</p>;

    return data?.map((item) => {
      const differenceValue = differenceType === 'leader' ? item?.differenceToLeader : item?.differenceToPrevious;

      const differenceText =
        differenceValue > 0 ? `(-${differenceValue})` : differenceType === 'leader' ? 'lead' : 'prev';

      return (
        <div className={'flex items-center gap-3 justify-between'} key={item?.id}>
          {/* <--- info ---> */}
          <Flex>
            <Badge variant={'outline'}>{item.position}</Badge>
            <p>{item?.name}</p>
          </Flex>

          {/* <--- points ---> */}
          <p className={'justify-self-start min-w-[80px] text-primary'}>
            {item?.points} <span className={'text-xs text-muted-foreground'}>{differenceText}</span>
          </p>
        </div>
      );
    });
  }, [data, differenceType, isLoading]);

  return (
    <div className={'rounded-md border p-3 md:p-5 bg-primary-foreground md:max-h-[415px] md:overflow-y-auto'}>
      <Flex className={'justify-between'}>
        <p>Constructors</p>
        <RenderFilters />
      </Flex>

      <div className={'mt-5 grid gap-3'}>{renderList}</div>
    </div>
  );
};

export default ConstructorsStandings;
