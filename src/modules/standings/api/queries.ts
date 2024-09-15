import QueryKeys from '@/constants/QueryKeys';
import { getConstructorsStandings, getDriversStandings } from '@/modules/standings/api/requests';
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
