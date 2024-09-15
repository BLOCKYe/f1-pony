import { RacesResponse } from '@/modules/races/api/dto';

/**
 * Parse races summary response
 * @param response
 * @returns
 */
export const RacesPresenter = (response: RacesResponse) => {
  if (!response?.MRData?.RaceTable) {
    return [];
  }

  return response?.MRData?.RaceTable?.Races.map((item) => ({
    id: item?.Circuit?.circuitId,
    round: item?.round,
    raceName: item?.raceName,
    circuitName: item?.Circuit?.circuitName,
    country: item?.Circuit?.Location?.country,
    locality: item?.Circuit?.Location?.locality,
    date: item?.date,
    time: item?.time,
    qualifyingDate: item?.Qualifying?.date,
    qualifyingTime: item?.Qualifying?.time,
    url: item?.url,
    circuitLat: item?.Circuit?.Location?.lat,
    circuitLong: item?.Circuit?.Location?.long,
  }));
};

export type RaceDomain = ReturnType<typeof RacesPresenter>[number];

/**
 * Parse race summary response
 * @param response
 * @returns
 */
export const RacePresenter = (response: RacesResponse) => {
  if (!response?.MRData?.RaceTable?.Races?.[0]) {
    return [];
  }

  return response?.MRData?.RaceTable?.Races?.[0].Results?.map((item) => ({
    id: item?.Driver?.driverId,
    name: `${item?.Driver?.givenName} ${item?.Driver?.familyName}`,
    position: item?.position,
    points: item?.points,
    grid: item?.grid === '0' ? 'P' : item?.grid,
    laps: item?.laps,
    status: item?.status,
    time: item?.Time?.time,
    fastestLapRank: item?.FastestLap?.rank,
    fastedLapTime: item?.FastestLap?.Time?.time,
    averageSpeed: item?.FastestLap?.AverageSpeed?.speed,
    team: item?.Constructor?.name,
  }));
};
