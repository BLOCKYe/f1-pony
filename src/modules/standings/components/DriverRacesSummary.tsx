import HeaderCard from '@/modules/home/components/HeaderCard';

interface DriverRacesSummaryProps {
  points: string;
  position: string;
  grid: string;
  fastestLaps: string;
}

const DriverRacesSummary: React.FC<DriverRacesSummaryProps> = (props) => {
  const { points, position, grid, fastestLaps } = props;

  return (
    <div className={'grid lg:grid-cols-4 gap-3'}>
      <HeaderCard>
        <h3>Points</h3>
        <p>Number of points scored</p>

        <h1 className={'mt-3'}>{points}</h1>
      </HeaderCard>

      <HeaderCard>
        <h3>Position</h3>
        <p>Average race position</p>

        <h1 className={'mt-3'}>{position}</h1>
      </HeaderCard>

      <HeaderCard>
        <h3>Grid</h3>
        <p>Average grid position</p>

        <h1 className={'mt-3'}>{grid}</h1>
      </HeaderCard>

      <HeaderCard>
        <h3>Fastest laps</h3>
        <p>Number of fastest laps</p>

        <h1 className={'mt-3'}>{fastestLaps}</h1>
      </HeaderCard>
    </div>
  );
};

export default DriverRacesSummary;
