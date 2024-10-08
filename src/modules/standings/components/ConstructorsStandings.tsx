import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Flex from '@/components/wrappers/Flex';
import { useGetConstructorsStandings } from '@/modules/standings/api/queries';
import { useMemo } from 'react';

const ConstructorsStandings = () => {
  const { data, isLoading } = useGetConstructorsStandings();

  /**
   * Renders list
   */
  const renderList = useMemo(() => {
    if (isLoading) return Array.from({ length: 10 }).map((_, idx) => <Skeleton key={idx} className={'h-[22px]'} />);

    if (!data) return <p>No data.</p>;

    return data?.map((item) => (
      <div className={'flex items-center gap-3 justify-between'} key={item?.id}>
        <Flex>
          <Badge variant={'outline'}>{item.position}</Badge>
          <p>{item?.name}</p>
        </Flex>
        <p>{item?.points}</p>
      </div>
    ));
  }, [data, isLoading]);

  return (
    <div className={'rounded-md border p-3 md:p-5 bg-primary-foreground md:max-h-[410px] md:overflow-y-auto'}>
      <p>Constructors</p>

      <div className={'mt-5 grid gap-3'}>{renderList}</div>
    </div>
  );
};

export default ConstructorsStandings;
