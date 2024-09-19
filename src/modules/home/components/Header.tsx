import HeaderRaceCard from '@/modules/home/components/HeaderRaceCard';
import HeaderSeasonCard from '@/modules/home/components/HeaderSeasonCard';
import { useGetRaces } from '@/modules/races/api/queries';
import getTimeFromLocal from '@/utils/getTimeFromLocal';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

const Header = () => {
  const { data } = useGetRaces();

  /**
   * Returns race details
   * @param type
   * @returns
   */
  const getRaceDetails = useCallback(
    (type: 'next' | 'previous') => {
      let country = 'Unknown';
      let locality = 'Unknown';

      let date = 'Unknown';
      let qualifyingDate = 'Unknown';

      if (!data)
        return {
          country,
          locality,
          date,
          qualifyingDate,
        };

      const index = data.findIndex((item) => {
        return moment().isBefore(moment(item.date));
      });

      if (index > -1) {
        const item = data[type === 'next' ? index : index - 1];

        country = item?.country ?? 'Unknown';
        locality = item?.locality ?? 'Unknown';
        date = getTimeFromLocal(`${item?.date}T${item?.time}`) ?? 'Unknown';
        qualifyingDate = getTimeFromLocal(`${item?.qualifyingDate}T${item?.qualifyingTime}`) ?? 'Unknown';
      }

      return {
        country,
        locality,
        date,
        qualifyingDate,
      };
    },
    [data]
  );

  /**
   * Returns season summary
   */
  const getSeasonSummary = useMemo(() => {
    let racesDone = 0;
    let racesTotal = 0;

    if (!data) return { racesDone, racesTotal };

    const today = moment(new Date());
    data?.forEach((item) => {
      if (today.isAfter(moment(item.date))) {
        racesDone++;
      }
      racesTotal++;
    });

    return {
      racesDone,
      racesTotal,
    };
  }, [data]);

  return (
    <div>
      <div>
        <h2>F1-Pony</h2>
        <p className={'mt-1'}>
          The F1 Standings App offers real-time updates on driver and constructor rankings, race results, driver
          profiles, historical data, and customizable notifications, keeping fans informed throughout the Formula 1
          season.
        </p>
      </div>

      {/* <--- quick summaries ---> */}
      <div className={'grid lg:grid-cols-3 gap-3 mt-5'}>
        {/* <--- selected season ---> */}
        <HeaderSeasonCard {...getSeasonSummary} />
        {/* <--- next race ---> */}
        <HeaderRaceCard type={'next'} {...getRaceDetails('next')} />
        {/* <--- previous race ---> */}
        <HeaderRaceCard type={'previous'} {...getRaceDetails('previous')} />
      </div>
    </div>
  );
};

export default Header;
