import { useGetRaces } from '@/modules/races/api/queries';
import RaceItem from '@/modules/races/components/RaceItem';
import { useMemo } from 'react';

const Races = () => {
  const { data } = useGetRaces();

  /**
   * Renders list
   */
  const renderList = useMemo(() => {
    if (!data) return <p>No data.</p>;

    return data?.map((item) => <RaceItem key={item?.id} {...item} />);
  }, [data]);

  return (
    <>
      <div className={'mt-10'}>
        <h3>Races results</h3>
        <p>Information about the races and qualifying sessions.</p>

        <div className={'rounded-md border p-3 md:p-5 bg-primary-foreground mt-5 grid gap-3 overflow-auto'}>{renderList}</div>
      </div>
    </>
  );
};

export default Races;
