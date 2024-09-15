import httpClient from '@/core/httpClient';
import { ConstructorsStandingsResponse, DriversStandingsResponse } from '@/modules/standings/api/dto';
import StandingsEndpoints from '@/modules/standings/api/endpoints';
import { ConstructorStandingsPresenter, DriverStandingsPresenter } from '@/modules/standings/api/transform';

/**
 * Fetch drivers standings based on season
 * @param season
 * @returns
 */
export const getDriversStandings = async (season: number) => {
  const response = await httpClient.get<DriversStandingsResponse>(StandingsEndpoints.drivers(season));
  return DriverStandingsPresenter(response.data);
};

/**
 * Fetch constructors standings based on season
 * @param season
 * @returns
 */
export const getConstructorsStandings = async (season: number) => {
  const response = await httpClient.get<ConstructorsStandingsResponse>(StandingsEndpoints.constructors(season));
  return ConstructorStandingsPresenter(response.data);
};
