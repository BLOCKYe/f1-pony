import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Cell from '@/components/wrappers/Cell';
import Flex from '@/components/wrappers/Flex';
import { useGetRace } from '@/modules/races/api/queries';
import { RaceDomain } from '@/modules/races/api/transform';
import RaceItemDetails from '@/modules/races/components/RaceItemDetails';
import isAfter from '@/modules/races/utils/isAfter';
import getTimeFromLocal from '@/utils/getTimeFromLocal';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react';

const RaceItem: React.FC<RaceDomain> = (props) => {
  const { round, raceName, date, country, locality, time } = props;
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
              <Badge variant={isAfter(getTimeFromLocal(`${date}T${time}`)) ? 'secondary' : 'default'}>{round}</Badge>
            </Cell>
            <p>
              {country}, {locality}
            </p>
          </Flex>

          <Flex>
            <Badge className={'md:ml-3 hidden md:block justify-self-start'} variant={'secondary'}>
              {raceName}
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
