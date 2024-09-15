import { StandingConstructorDto, StandingDriverDto } from '@/modules/standings/api/dto';

/**
 * Races DTO
 */
export interface RacesResponse {
  MRData: RacesResponseInfo;
}

export interface RacesResponseInfo {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RacesTableDto;
}

export interface RacesTableDto {
  season: string;
  Races: RaceDto[];
}

export interface RaceDto {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: CircuitDto;
  date: string;
  time: string;
  FirstPractice?: SessionDto;
  SecondPractice?: SessionDto;
  ThirdPractice?: SessionDto;
  Qualifying?: SessionDto;
  Results?: RaceResultDto[];
}

export interface CircuitDto {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: LocationDto;
}

export interface LocationDto {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface SessionDto {
  date: string;
  time: string;
}

export interface RaceResultDto {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Constructor: StandingConstructorDto;
  Driver: StandingDriverDto;
  grid: string;
  laps: string;
  status: string;
  Time: { millis: string; time: string };
  FastestLap: FastestLapDto;
}

export interface FastestLapDto {
  rank: string;
  lap: string;
  Time: { time: string };
  AverageSpeed: {
    units: string;
    speed: string;
  };
}
