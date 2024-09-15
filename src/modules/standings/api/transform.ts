import { ConstructorsStandingsResponse, DriversStandingsResponse } from '@/modules/standings/api/dto';

/**
 * Parse drivers standings response
 * @param response
 * @returns
 */
export const DriverStandingsPresenter = (response: DriversStandingsResponse) => {
  if (!response?.MRData?.StandingsTable?.StandingsLists?.[0]) {
    return [];
  }

  return response?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings?.map((item) => ({
    id: item?.Driver?.driverId,
    name: `${item?.Driver?.givenName} ${item?.Driver?.familyName}`,
    points: item?.points,
    position: item?.positionText ?? '',
    team: item.Constructors?.[0]?.name ?? '',
  }));
};

/**
 * Parse constructors standings response
 * @param response
 * @returns
 */
export const ConstructorStandingsPresenter = (response: ConstructorsStandingsResponse) => {
  if (!response?.MRData?.StandingsTable?.StandingsLists?.[0]) {
    return [];
  }

  return response?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings?.map((item) => ({
    id: item?.Constructor?.constructorId,
    name: item?.Constructor?.name,
    points: item?.points,
    position: item?.positionText ?? '',
  }));
};
