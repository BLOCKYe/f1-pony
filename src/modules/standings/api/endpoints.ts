const StandingsEndpoints = {
  drivers: (season: number) => `${season}/driverStandings.json`,
  constructors: (season: number) => `${season}/constructorStandings.json`,
};

export default StandingsEndpoints;
