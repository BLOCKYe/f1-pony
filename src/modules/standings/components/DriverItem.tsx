import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Flex from '@/components/wrappers/Flex';
import { useGetDriversResults } from '@/modules/standings/api/queries';
import { DriverDomain } from '@/modules/standings/api/transform';
import DriverItemDetails from '@/modules/standings/components/DriverItemDetails';
import React, { useState } from 'react';

const DriverItem: React.FC<DriverDomain> = (props) => {
  const { name, points, position, team } = props;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetDriversResults({ enabled: open, driverId: props.id });

  return (
    <Dialog onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>
        <div className={'flex items-center gap-3 justify-between transition-all hover:underline cursor-pointer'}>
          <Flex>
            <Badge variant={'outline'}>{position}</Badge>
            <p>
              {name}
              <Badge className={'ml-3'} variant={'secondary'}>
                {team}
              </Badge>
            </p>
          </Flex>
          <p>{points}</p>
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
