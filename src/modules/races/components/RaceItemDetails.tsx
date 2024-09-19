import { Badge } from '@/components/ui/badge';
import { DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import Cell from '@/components/wrappers/Cell';
import Divider from '@/components/wrappers/Divider';
import Flex from '@/components/wrappers/Flex';
import { RaceDetailsDomain, RaceDomain } from '@/modules/races/api/transform';
import isAfter from '@/modules/races/utils/isAfter';
import isFastestLap from '@/modules/races/utils/isFastestLap';
import isProgress from '@/modules/races/utils/isProgress';
import openInNewTab from '@/utils/openInNewTab';
import redirectToGoogleMaps from '@/utils/redirectToGoogleMap';
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import React, { useMemo } from 'react';
import { IoIosArrowRoundBack, IoMdStopwatch, IoMdCalendar } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';

interface RaceItemDetailsProps {
  race: RaceDomain;
  data: RaceDetailsDomain[];
  isLoading: boolean;
}

const RaceItemDetails: React.FC<RaceItemDetailsProps> = (props) => {
  const { race, data, isLoading } = props;
  const { round, raceName, date, country, locality, circuitLat, circuitLong, url } = race;
  /**
   * Renders summary list
   */
  const renderList = useMemo(() => {
    if (isLoading) return Array.from({ length: 22 }).map((_, idx) => <Skeleton key={idx} className={'h-[22px]'} />);
    if (!data || !data?.length) return <p>No race data.</p>;

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
    <>
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

      <Divider />
      <div className={'whitespace-nowrap overflow-auto pb-3 grid gap-3'}>{renderList}</div>
    </>
  );
};

export default RaceItemDetails;
