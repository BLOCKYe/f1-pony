import { Badge } from '@/components/ui/badge';
import Flex from '@/components/wrappers/Flex';
import HeaderCard from '@/modules/home/components/HeaderCard';
import { FaRegFlag, FaFlagCheckered } from 'react-icons/fa';

interface HeaderRaceCardProps {
  type: 'next' | 'previous';
  country: string;
  locality: string;
  date: string;
  qualifyingDate: string;
}

const HeaderRaceCard: React.FC<HeaderRaceCardProps> = (props) => {
  const { type, country, locality, date, qualifyingDate } = props;
  return (
    <HeaderCard>
      <Flex className={'justify-between'}>
        <h3>
          {locality}, {country}
        </h3>
        <Badge variant={type === 'next' ? 'default' : 'secondary'}>{type === 'next' ? 'Next' : 'Previous'}</Badge>
      </Flex>

      <div className={'mt-3'}>
        <Flex>
          <FaRegFlag className={'text-neutral-400'} />
          <p>{qualifyingDate}</p>
        </Flex>
        <Flex className={'mt-1'}>
          <FaFlagCheckered className={'text-neutral-400'} />
          <p>{date}</p>
        </Flex>
      </div>
    </HeaderCard>
  );
};

export default HeaderRaceCard;
