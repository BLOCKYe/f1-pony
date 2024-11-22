import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Flex from '@/components/wrappers/Flex';
import { useGetDriversResults } from '@/modules/standings/api/queries';
import { DriverDomain } from '@/modules/standings/api/transform';
import DriverItemDetails from '@/modules/standings/components/DriverItemDetails';
import { DifferenceType } from '@/utils/useDifferenceType';
import React, { useState } from 'react';

const DriverItem: React.FC<DriverDomain & { differenceType: DifferenceType }> = (props) => {
  const { name, points, position, team, differenceToLeader, differenceToPrevious, differenceType } = props;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetDriversResults({ enabled: open, driverId: props.id });

  const differenceValue = differenceType === 'leader' ? differenceToLeader : differenceToPrevious;
  const differenceText = differenceValue > 0 ? `(-${differenceValue})` : differenceType === 'leader' ? 'lead' : 'prev';

  return (
    <Dialog onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>
        <div className={'flex items-center gap-3 justify-between transition-all hover:underline cursor-pointer'}>
          <Flex>
            <Badge variant={'outline'}>{position}</Badge>
            <Flex>
              <p>{name}</p>
              <Badge className={'ml-3 hidden md:flex'} variant={'secondary'}>
                {team}
              </Badge>
            </Flex>
          </Flex>
          <p className={'justify-self-start min-w-[80px] text-primary'}>
            {points} <span className={'text-xs text-muted-foreground'}>{differenceText}</span>
          </p>
        </div>
      </DialogTrigger>

      {/* <--- render dialog ---> */}
      <DialogContent className={'max-w-6xl'}>
        <DriverItemDetails driver={props} data={data ?? []} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default DriverItem;
