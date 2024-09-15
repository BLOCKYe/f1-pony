const RacesEndpoints = {
  races: (season: number) => `${season}.json`,
  race: (season: number, round: string) => `${season}/${round}/results.json`,
};

export default RacesEndpoints;
