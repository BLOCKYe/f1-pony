/**
 * Drivers DTO
 */
export interface DriversStandingsResponse {
  MRData: DriversStandingsResponseInfo;
}

export interface DriversStandingsResponseInfo {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: DriversStandingsTableDto;
}

export interface DriversStandingsTableDto {
  season: string;
  StandingsLists: DriversStandingsListDto[];
}

export interface DriversStandingsListDto {
  season: string;
  round: string;
  DriverStandings: DriversStandingDto[];
}

export interface DriversStandingDto {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: StandingDriverDto;
  Constructors: StandingConstructorDto[];
}

export interface StandingConstructorDto {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface StandingDriverDto {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

/**
 * Constructors DTO
 */
export interface ConstructorsStandingsResponse {
  MRData: ConstructorsStandingsResponseInfo;
}

export interface ConstructorsStandingsResponseInfo {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: ConstructorsStandingsTableDto;
}

export interface ConstructorsStandingsTableDto {
  season: string;
  StandingsLists: ConstructorsStandingsListDto[];
}

export interface ConstructorsStandingsListDto {
  season: string;
  round: string;
  ConstructorStandings: ConstructorStandingDto[];
}

export interface ConstructorStandingDto {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: StandingConstructorDto;
}
