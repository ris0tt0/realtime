import Logger from 'js-logger';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../../components/DropDownList';
import { useCommands } from '../../hooks/useCommands';
import { realTimeDeparturesListSelector } from '../../selectors/RealTimeDepartures';
import { getStationsListSelector } from '../../selectors/station';

function RealTimeDeparturesList() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const results = useSelector(realTimeDeparturesListSelector);
  const stations = useSelector(getStationsListSelector);
  const commands = useCommands();

  Logger.info('RealTimeDepartuesList::loading', loading);

  useEffect(() => {
    if (results[0] && results[0].name) {
      stations.some((station) => {
        if (station.abbr == results[0].abbr) {
          setSelected(station);
          return true;
        }
        return false;
      });
    }
  }, [results, stations]);

  const handleSelect = useCallback(
    (selected) => {
      setLoading(true);
      setSelected(selected);

      commands
        .setRTDStationAbbr(selected.abbr)
        .finally(() => setLoading(false));
    },
    [commands]
  );

  return (
    <DropDownList items={stations} value={selected} onSelect={handleSelect} />
  );
}

export default RealTimeDeparturesList;
