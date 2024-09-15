import { Badge } from '@/components/ui/badge';
import Flex from '@/components/wrappers/Flex';
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { RaceDomain } from '@/modules/races/api/transform';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useGetRace } from '@/modules/races/api/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { IoIosArrowRoundBack, IoMdCalendar, IoMdStopwatch } from 'react-icons/io';
import Cell from '@/components/wrappers/Cell';
import { IoLocationSharp } from 'react-icons/io5';
import Divider from '@/components/wrappers/Divider';
import redirectToGoogleMaps from '@/utils/redirectToGoogleMap';
import openInNewTab from '@/utils/openInNewTab';

/**
 * Returns true if date is after today
 * @param date
 * @returns
 */
const isAfter = (date: string) => {
  const today = moment(new Date());

  return today.isAfter(moment(date));
};

/**
 * Returns true if place is greater than grid
 * @param grid
 * @param position
 * @returns
 */
const isProgress = (grid: string, position: string) => {
  if (grid === '0') return true;

  const placeNumber = parseInt(position);
  const gridNumber = parseInt(grid);

  return placeNumber - gridNumber <= 0;
};

/**
 * Returns true if lapPosition is fastest lap
 * @param lapPosition
 * @returns
 */
const isFastestLap = (lapPosition: string) => {
  const placeNumber = parseInt(lapPosition);

  return placeNumber === 1;
};

const RaceItem: React.FC<RaceDomain> = (props) => {
  const { round, raceName, date, circuitName, country, locality, circuitLat, circuitLong, url, time } = props;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetRace({ enabled: open, round });

  /**
   * Render race table item
   */
  const renderItem = useMemo(() => {
    return (
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
    );
  }, [circuitName, date, raceName, round, time]);

  /**
   * Render dialog header
   */
  const renderDialogHeader = useMemo(() => {
    return (
      <DialogHeader>
        <DialogTitle>Race results</DialogTitle>
        <DialogDescription>
          <p>Summary of selected race.</p>

          <Flex className={'mt-3 flex-wrap justify-center sm:justify-start'}>
            <Badge variant={isAfter(date) ? 'secondary' : 'default'}>Round {round}</Badge>

            <Badge variant={'default'} className={'cursor-pointer'} onClick={() => openInNewTab(url)}>
              {raceName}
            </Badge>

            <Badge
              variant={'outline'}
              className={'cursor-pointer'}
              onClick={() => redirectToGoogleMaps(circuitLat, circuitLong)}>
              <IoLocationSharp fontSize={'small'} className={'mr-2'} />
              <span>
                {locality} <b>{country}</b>
              </span>
            </Badge>

            <Badge variant={'outline'}>
              <IoMdCalendar fontSize={'small'} className={'mr-2'} />
              {date}
            </Badge>
          </Flex>
        </DialogDescription>
      </DialogHeader>
    );
  }, [circuitLat, circuitLong, country, date, locality, raceName, round, url]);

  /**
   * Renders summary list
   */
  const renderList = useMemo(() => {
    if (isLoading) return Array.from({ length: 22 }).map((_, idx) => <Skeleton key={idx} className={'h-[22px]'} />);
    if (!data || !data?.length) return <p>No data.</p>;

    return data?.map((item) => (
      <Flex key={item?.id} className={'justify-between'}>
        <Flex>
          {/* <--- position / gained ---> */}
          <Cell className={'w-24'}>
            <Badge variant={'outline'}>
              {item?.position}
              <p
                className={`text-xs ml-3 flex gap-3 items-center ${
                  isProgress(item.grid, item.position) ? 'text-green-600' : 'text-red-600'
                }`}>
                <IoIosArrowRoundBack fontSize={'large'} />
                {item?.grid}
              </p>
            </Badge>
          </Cell>

          {/* <--- driver name ---> */}
          <Cell className={'w-36'}>
            <Flex className={'gap-2'}>
              <p>{item?.name}</p>
              {isFastestLap(item?.fastestLapRank) && <IoMdStopwatch className={'text-purple-500'} />}
            </Flex>
          </Cell>

          {/* <--- team ---> */}
          <Cell className={'w-32'}>
            <Badge variant={'secondary'}>{item?.team}</Badge>
          </Cell>
        </Flex>

        <Flex>
          {/* <--- laps ---> */}
          <Cell className={'w-8'}>
            <p>{item?.laps}</p>
          </Cell>

          {/* <--- time ---> */}
          <Cell className={'w-20'}>
            <p>{item?.time ?? 'No time'}</p>
          </Cell>

          {/* <--- status ---> */}
          <Cell className={'w-24'}>
            <Badge variant={'outline'}>{item?.status}</Badge>
          </Cell>

          {/* <--- points ---> */}
          <Cell className={'w-12'}>
            <Badge variant={'outline'}>+{item?.points}</Badge>
          </Cell>
        </Flex>
      </Flex>
    ));
  }, [data, isLoading]);

  return (
    <Dialog onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>{renderItem}</DialogTrigger>

      <DialogContent className={'max-w-4xl'}>
        {renderDialogHeader}

        <Divider />
        <div className={'whitespace-nowrap overflow-auto pb-3 grid gap-3'}>{renderList}</div>
      </DialogContent>
    </Dialog>
  );
};

export default RaceItem;
