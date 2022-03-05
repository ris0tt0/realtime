import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Logger from 'js-logger';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../../components/DropDownList';
import { useCommands } from '../../hooks/useCommands';
import { getStationsListSelector } from '../../selectors/station';

const StationsList = () => {
  const commands = useCommands();
  const stations = useSelector(getStationsListSelector);
  const [loading, setLoading] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [originAbbr, setOriginAbbr] = useState(null);
  const [destAbbr, setDestAbbr] = useState(null);

  useEffect(() => {
    Logger.info('search:', originAbbr, destAbbr);
    if (originAbbr === null || destAbbr === null) {
      return;
    }
    if (originAbbr === destAbbr) {
      setErrorMsg('origin and destination must not be the same');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    commands
      .requestTripPlanning(originAbbr, destAbbr)
      .finally(() => setLoading(false));
  }, [commands, originAbbr, destAbbr]);

  const handleOrigin = useCallback(
    (abbr) => {
      Logger.info('handleOrigin::abbr', abbr, destAbbr);
      setOriginAbbr(abbr);
    },
    [destAbbr]
  );

  const handleDestination = useCallback(
    (abbr) => {
      Logger.info('handleDestination::', abbr, originAbbr);
      setDestAbbr(abbr);
    },
    [originAbbr]
  );

  return (
    <div className="flex flex-col w-full border border-purple-400 rounded">
      <div className="flex w-full space-x-4">
        <div className="w-full">
          <div className="text-xs font-thin">origin:</div>
          <DropDownList items={stations} onSelect={handleOrigin} />
        </div>
        <div className="w-full">
          <div className="text-xs font-thin">destination:</div>
          <DropDownList items={stations} onSelect={handleDestination} />
        </div>
      </div>
      {errorMsg ? <div className="w-full text-red-500">{errorMsg}</div> : null}
      <div className="py-2">
        <span className="text-xs font-thin">time:</span>{' '}
        <span className="font-mono text-sm hover:text-slate-400">NOW</span>
      </div>
    </div>
  );
};

export default StationsList;
