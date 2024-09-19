import QueryKeys from '@/constants/QueryKeys';
import { getConstructorsStandings, getDriverResults, getDriversStandings } from '@/modules/standings/api/requests';
import { useGlobalContext } from '@/providers/GlobalContext';
import { useQuery } from 'react-query';

/**
 * This hook will fetch drivers standings based on season
 * @returns
 */
export const useGetDriversStandings = () => {
  const { season } = useGlobalContext();

  const query = useQuery({
    queryKey: [QueryKeys.DRIVERS_STANDINGS, { season }],
    queryFn: () => getDriversStandings(season),
  });

  return query;
};

/**
 * This hook will fetch constructors standings based on season
 * @returns
 */
export const useGetConstructorsStandings = () => {
  const { season } = useGlobalContext();

  const query = useQuery({
    queryKey: [QueryKeys.CONSTRUCTORS_STANDINGS, { season }],
    queryFn: () => getConstructorsStandings(season),
  });

  return query;
};

/**
 * This hook will fetch drivers results based on season
 * @returns
 */
export const useGetDriversResults = (args: { enabled: boolean; driverId: string }) => {
  const { enabled = false, driverId } = args;
  const { season } = useGlobalContext();

  const query = useQuery({
    queryKey: [QueryKeys.DRIVERS_RESULTS, { season, driverId }],
    queryFn: () => getDriverResults({ season, driverId }),
    enabled: enabled,
  });

  return query;
};
