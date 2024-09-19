const StandingsEndpoints = {
  drivers: (season: number) => `${season}/driverStandings.json`,
  constructors: (season: number) => `${season}/constructorStandings.json`,
  driverResults: (season: number, driverId: string) => `${season}/drivers/${driverId}/results.json`,
};

export default StandingsEndpoints;
