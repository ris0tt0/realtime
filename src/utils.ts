import { compareAsc, format, isValid, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatFeedDate = (date: Date) => {
  const result = format(date, 'M-d-yyyy');

  return result;
};

export const getCurrentFormattedDate = () => {
  const date = new Date();

  const result = formatFeedDate(date);

  return result;
};

export const getSomeDayBefore = (date?: string) => {
  if (!date) return false;

  const today = getCurrentFormattedDate();
  const result = compareAsc(new Date(date), new Date(today));

  return result === -1;
};

export const formatFeedDateString = (date: string = '') => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), { locale: enUS });
  const isValidDate = isValid(parsedDate);

  if (!isValidDate) {
    return null;
  }

  return parsedDate;
};

export const removeArtifacts = (intro: string) => {
  const stationMap = intro.replace('Station Map', '');
  const transitStops = stationMap.replace('Transit Stops', '');
  const transitRoutes = transitStops.replace('Transit Routes', '');
  const schedulesAndFares = transitRoutes.replace('Schedules and Fares', '');
  const mapsOfThisStations = schedulesAndFares.replace(
    'Maps of this station:',
    '',
  );
  const mapsOfThisStations2 = mapsOfThisStations.replace(
    'Maps of this station',
    '',
  );
  const mapsOfTheStations = mapsOfThisStations2.replace(
    'Maps of the station:',
    '',
  );
  const mapsOfTheStations2 = mapsOfTheStations.replace(
    'Maps of the station',
    '',
  );

  const result = mapsOfTheStations2.replace('Parking Map', '');

  return result;
};
