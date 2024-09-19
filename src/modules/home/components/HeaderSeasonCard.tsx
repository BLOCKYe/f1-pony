import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Flex from '@/components/wrappers/Flex';
import HeaderCard from '@/modules/home/components/HeaderCard';
import { useGlobalContext } from '@/providers/GlobalContext';
import { useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface HeaderSeasonCardProps {
  racesDone: number;
  racesTotal: number;
}

const HeaderSeasonCard: React.FC<HeaderSeasonCardProps> = (props) => {
  const { racesDone, racesTotal } = props;
  const { season, setSeason } = useGlobalContext();

  /**
   * Returns current year
   */
  const currentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <HeaderCard>
      <Flex className={'justify-between'}>
        <div className={'flex items-center gap-1'}>
          <Button variant={'ghost'} className={'p-1'} onClick={() => setSeason((prev) => prev - 1)}>
            <IoIosArrowBack />
          </Button>
          <h3>Season {season}</h3>
          <Button
            variant={'ghost'}
            className={'p-1'}
            onClick={() => setSeason((prev) => prev + 1)}
            disabled={currentYear === season}>
            <IoIosArrowForward />
          </Button>
        </div>

        {currentYear === season && (
          <Badge variant={'outline'} className={'ml-1'}>
            Current
          </Badge>
        )}
      </Flex>

      <div className={'mt-3'}>
        <Flex className={'justify-between'}>
          <p>Progress</p>
          <Flex>
            <h3>
              <b>{racesDone}</b>
            </h3>
            <p>/ {racesTotal} races</p>
          </Flex>
        </Flex>
        <Progress value={(racesDone / racesTotal) * 100} className={'mt-2 h-1'} />
      </div>
    </HeaderCard>
  );
};

export default HeaderSeasonCard;
