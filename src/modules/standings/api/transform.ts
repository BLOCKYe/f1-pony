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

  const standings = response?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings ?? [];
  const leaderPoints = response?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings?.[0]?.points ?? 0;

  const parsedStandings = [];

  for (let i = 0; i < standings.length; i++) {
    const item = {
      id: standings[i]?.Driver?.driverId,
      name: `${standings[i]?.Driver?.givenName} ${standings[i]?.Driver?.familyName}`,
      points: standings[i]?.points,
      position: standings[i]?.positionText ?? '',
      team: standings[i].Constructors?.[0]?.name ?? '',
      differenceToLeader: parseInt(leaderPoints) - parseInt(standings[i]?.points ?? '0'),
      differenceToPrevious: parseInt(standings[i - 1]?.points ?? '0') - parseInt(standings[i]?.points ?? '0'),
    };

    parsedStandings.push(item);
  }

  return parsedStandings;
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

  const standings = response?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings ?? [];
  const leaderPoints = response?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings?.[0]?.points ?? 0;

  const parsedStandings = [];

  for (let i = 0; i < standings.length; i++) {
    const item = {
      id: standings[i]?.Constructor?.constructorId,
      name: standings[i]?.Constructor?.name,
      points: standings[i]?.points,
      position: standings[i]?.positionText ?? '',
      differenceToLeader: parseInt(leaderPoints) - parseInt(standings[i]?.points ?? '0'),
      differenceToPrevious: parseInt(standings[i - 1]?.points ?? '0') - parseInt(standings[i]?.points ?? '0'),
    };

    parsedStandings.push(item);
  }

  return parsedStandings;
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
