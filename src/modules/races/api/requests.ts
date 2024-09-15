import httpClient from '@/core/httpClient';
import { RacesResponse } from '@/modules/races/api/dto';
import RacesEndpoints from '@/modules/races/api/endpoints';
import { RacesPresenter, RacePresenter } from '@/modules/races/api/transform';

/**
 * Fetch drivers standings based on season
 * @param season
 * @returns
 */
export const getRaces = async (season: number) => {
  const response = await httpClient.get<RacesResponse>(RacesEndpoints.races(season));
  return RacesPresenter(response.data);
};

/**
 * Fetch race results based on season and round
 * @param payload
 */
export const getRace = async (payload: { season: number; round: string }) => {
  const response = await httpClient.get<RacesResponse>(RacesEndpoints.race(payload.season, payload.round));
  return RacePresenter(response.data);
};
