import QueryKeys from '@/constants/QueryKeys';
import { getRace, getRaces } from '@/modules/races/api/requests';
import { useGlobalContext } from '@/providers/GlobalContext';
import { useQuery } from 'react-query';

/**
 * This hook will fetch races based on season
 * @returns
 */
export const useGetRaces = () => {
  const { season } = useGlobalContext();

  const query = useQuery({
    queryKey: [QueryKeys.RACES, { season }],
    queryFn: () => getRaces(season),
  });

  return query;
};

/**
 * This hook will fetch race summary based on season and round
 * @returns
 */
export const useGetRace = (args: { enabled: boolean; round: string }) => {
  const { enabled = false, round } = args;
  const { season } = useGlobalContext();

  const query = useQuery({
    queryKey: [QueryKeys.RACES, { round, season }],
    queryFn: () => getRace({ season, round }),
    enabled: enabled,
  });

  return query;
};
