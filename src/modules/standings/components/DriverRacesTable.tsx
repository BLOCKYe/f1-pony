import { Badge } from '@/components/ui/badge';
import Cell from '@/components/wrappers/Cell';
import Flex from '@/components/wrappers/Flex';
import HeaderCard from '@/modules/home/components/HeaderCard';
import isFastestLap from '@/modules/races/utils/isFastestLap';
import isProgress from '@/modules/races/utils/isProgress';
import { DriverResultsDomain } from '@/modules/standings/api/transform';
import React, { useMemo } from 'react';
import { IoIosArrowRoundBack, IoMdStopwatch } from 'react-icons/io';

interface DriverRacesTableProps {
  data: DriverResultsDomain[];
}
const DriverRacesTable: React.FC<DriverRacesTableProps> = (props) => {
  const { data } = props;

  /**
   * Renders summary list
   */
  const renderList = useMemo(() => {
    if (!data || !data?.length) return <p>No race data.</p>;

    return data.map((item) => (
      <Flex key={item?.id} className={'justify-between w-full gap-5'}>
        <Flex>
          {/* <--- position / gained ---> */}
          <Cell className={'w-24'}>
            <Badge variant={'outline'}>
              {item?.position}
              <p
                className={`text-xs ml-3 flex gap-3 items-center ${
                  isProgress(item?.grid ?? '', item?.position ?? '') ? 'text-green-600' : 'text-red-600'
                }`}>
                <IoIosArrowRoundBack fontSize={'large'} />
                {item?.grid}
              </p>
            </Badge>
          </Cell>

          {/* <--- location ---> */}
          <Cell className={'w-40'}>
            <Flex className={'gap-2'}>
              <p>{item?.locality}, {item?.country}</p>
              {isFastestLap(item?.fastestLapRank ?? '') && <IoMdStopwatch className={'text-purple-500'} />}
            </Flex>
          </Cell>

          {/* <--- circuit ---> */}
          <Cell >
            <Badge variant={'secondary'}>{item?.circuitName}</Badge>
          </Cell>
        </Flex>

        <Flex>
          {/* <--- laps ---> */}
          <Cell className={'w-8'}>
            <p>{item?.laps}</p>
          </Cell>

          {/* <--- time ---> */}
          <Cell className={'w-20'}>
            <p>{item?.raceTime ?? 'No time'}</p>
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
  }, [data]);

  return (
    <div>
      <div className={'mb-5 ml-5'}>
        <h3>Season summary</h3>
        <p>Table view of all races</p>
      </div>

      <HeaderCard>
        <div className={'whitespace-nowrap overflow-auto pb-3 grid gap-3'}>{renderList}</div>
      </HeaderCard>
    </div>
  );
};

export default DriverRacesTable;
