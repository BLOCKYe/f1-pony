import { Badge } from '@/components/ui/badge';
import Flex from '@/components/wrappers/Flex';
import React, { useState } from 'react';
import { RaceDomain } from '@/modules/races/api/transform';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useGetRace } from '@/modules/races/api/queries';
import Cell from '@/components/wrappers/Cell';
import RaceItemDetails from '@/modules/races/components/RaceItemDetails';
import isAfter from '@/modules/races/utils/isAfter';

const RaceItem: React.FC<RaceDomain> = (props) => {
  const { round, raceName, date, circuitName, time } = props;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetRace({ enabled: open, round });

  return (
    <Dialog onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>
        <div
          className={
            'flex items-center gap-3 justify-between transition-all hover:underline cursor-pointer w-full whitespace-nowrap'
          }>
          <Flex>
            <Cell className={'w-14'}>
              <Badge variant={isAfter(`${date}T${time}`) ? 'secondary' : 'default'}>{round}</Badge>
            </Cell>
            <p>{raceName}</p>
          </Flex>

          <Flex>
            <Badge className={'md:ml-3 hidden md:block justify-self-start'} variant={'secondary'}>
              {circuitName}
            </Badge>
            <Cell className={'min-w-20'}>
              <p className={'text-right text-xs'}>{date}</p>
            </Cell>
          </Flex>
        </div>
      </DialogTrigger>

      {/* <--- render dialog ---> */}
      <DialogContent className={'max-w-4xl'}>
        <RaceItemDetails data={data ?? []} race={props} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default RaceItem;
