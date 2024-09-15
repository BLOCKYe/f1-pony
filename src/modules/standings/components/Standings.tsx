import ConstructorsStandings from '@/modules/standings/components/ConstructorsStandings';
import DriversStandings from '@/modules/standings/components/DriversStandings';

const Standings = () => {
  return (
    <div className={'mt-10'}>
      <h3>Current standings</h3>
      <p>Up-to-date standings for the season.</p>

      <div className={'grid md:grid-cols-2 mt-5 gap-3'}>
        <DriversStandings />
        <ConstructorsStandings />
      </div>
    </div>
  );
};

export default Standings;
