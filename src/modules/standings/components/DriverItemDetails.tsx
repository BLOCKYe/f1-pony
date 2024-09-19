import { Badge } from '@/components/ui/badge';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Flex from '@/components/wrappers/Flex';
import { DriverDomain, DriverResultsDomain } from '@/modules/standings/api/transform';
import DriverItemDetailsSkeleton from '@/modules/standings/components/DriverItemDetails.skeleton';
import DriverRacesBarChart from '@/modules/standings/components/DriverRacesBarChart';
import DriverRacesLineChart from '@/modules/standings/components/DriverRacesLineChart';
import DriverRacesSummary from '@/modules/standings/components/DriverRacesSummary';
import DriverRacesTable from '@/modules/standings/components/DriverRacesTable';
import { useGlobalContext } from '@/providers/GlobalContext';
import { useMemo } from 'react';
import { IoMdCalendar } from 'react-icons/io';

interface DriverItemDetailsProps {
  driver: DriverDomain;
  data: DriverResultsDomain[];
  isLoading: boolean;
}

const DriverItemDetails: React.FC<DriverItemDetailsProps> = (props) => {
  const { driver, data, isLoading } = props;
  const { season } = useGlobalContext();

  /**
   * Returns parsed data for bar chart
   */
  const racesChartData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      place: `${item?.round}. ${item?.locality}`,
      race: parseInt(item?.position ?? ''),
      qualifying: parseInt(item?.grid === '0' ? '20' : item?.grid ?? ''),
    }));
  }, [data]);

  /**
   * Returns parsed summary data for summary
   */
  const racesSummaryData = useMemo(() => {
    if (!data) return { points: '0', position: '0', grid: '0', fastestLaps: '0' };

    const racesNumber = data?.length;

    const position = data?.reduce((acc, item) => acc + parseInt(item?.position ?? ''), 0);
    const grid = data?.reduce((acc, item) => acc + parseInt(item?.grid ?? ''), 0);

    const fastestLaps = data?.reduce((acc, item) => {
      const laps = item?.fastestLapRank === '1' ? '1' : '0';
      return acc + (laps ? parseInt(laps) : 0);
    }, 0);

    return {
      points: driver?.points,
      position: (position / racesNumber).toFixed(2),
      grid: (grid / racesNumber).toFixed(2),
      fastestLaps: fastestLaps.toFixed(0),
    };
  }, [data, driver?.points]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className={'text-start'}>Driver summary</DialogTitle>
        <DialogDescription className={'text-start'}>
          <p>Summary of selected driver.</p>

          <Flex className={'mt-10 flex-wrap justify-start sm:justify-start'}>
            <Badge variant={'secondary'}>
              <h3>{driver?.position}</h3>
            </Badge>
            <Badge variant={'default'}>
              <h3>{driver?.name}</h3>
            </Badge>
            <Badge variant={'outline'}>{driver?.team}</Badge>
            <Badge variant={'outline'}>
              <IoMdCalendar fontSize={'small'} className={'mr-2'} />
              Season {season}
            </Badge>
          </Flex>
        </DialogDescription>
      </DialogHeader>

      {isLoading && <DriverItemDetailsSkeleton />}
      {!isLoading && (
        <>
          <DriverRacesSummary {...racesSummaryData} />

          <div className={'mt-10'}>
            <DriverRacesLineChart data={racesChartData} />
          </div>

          <div className={'mt-10'}>
            <DriverRacesTable data={data ?? []} />
          </div>

          <div className={'mt-10'}>
            <DriverRacesBarChart data={racesChartData} />
          </div>
        </>
      )}
    </>
  );
};

export default DriverItemDetails;
