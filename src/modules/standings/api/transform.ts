import { RacesResponse } from '@/modules/races/api/dto';
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

export type DriverDomain = ReturnType<typeof DriverStandingsPresenter>[number];

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

export type ConstructorDomain = ReturnType<typeof ConstructorStandingsPresenter>[number];

/**
 * Parse driver season results response
 * @param response
 * @returns
 */
export const DriverResultsPresenter = (response: RacesResponse) => {
  if (!response?.MRData?.RaceTable?.Races) {
    return [];
  }

  return response?.MRData?.RaceTable?.Races?.map((race) => {
    const raceResult = race?.Results?.[0];

    if (!raceResult) return;

    return {
      id: race?.Circuit?.circuitId ?? '',
      circuitName: race?.Circuit?.circuitName ?? '',
      round: race?.round ?? '',
      date: race?.date ?? '',
      time: race?.time ?? '',
      raceTime: raceResult?.Time?.time ?? '',
      country: race?.Circuit?.Location?.country ?? '',
      locality: race?.Circuit?.Location?.locality ?? '',
      grid: raceResult?.grid ?? '',
      laps: raceResult?.laps ?? '',
      position: raceResult?.position ?? '',
      points: raceResult?.points ?? '',
      fastestLapRank: raceResult?.FastestLap?.rank ?? '',
      status: raceResult?.status ?? '',
    };
  });
};

export type DriverResultsDomain = ReturnType<typeof DriverResultsPresenter>[number];
