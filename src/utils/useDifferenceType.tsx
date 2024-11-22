import { Badge } from '@/components/ui/badge';
import Flex from '@/components/wrappers/Flex';
import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';

export type DifferenceType = 'leader' | 'previous';

function useDifferenceType() {
  const [differenceType, setDifferenceType] = useState<DifferenceType>('leader');

  /**
   * Returns filters component
   */
  const RenderFilters = useCallback(() => {
    return (
      <Flex className={'gap-1'}>
        <Badge
          className={cn('cursor-pointer opacity-50', differenceType === 'leader' && 'opacity-100')}
          onClick={() => setDifferenceType('leader')}
          variant={differenceType === 'leader' ? 'secondary' : 'outline'}>
          Lead
        </Badge>
        <Badge
          className={cn('cursor-pointer opacity-50', differenceType === 'previous' && 'opacity-100')}
          onClick={() => setDifferenceType('previous')}
          variant={differenceType === 'previous' ? 'secondary' : 'outline'}>
          Prev
        </Badge>
      </Flex>
    );
  }, [differenceType]);

  return { differenceType, setDifferenceType, RenderFilters };
}

export default useDifferenceType;
