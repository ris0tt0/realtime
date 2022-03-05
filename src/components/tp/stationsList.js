import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Logger from 'js-logger';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommands } from '../../hooks/useCommands';
import { getStationsListSelector } from '../../selectors/station';

const MyList = ({ items = [], onSelect = () => null }) => {
  const [selected, setSelected] = useState();
  const handleSelect = useCallback(
    (item) => {
      Logger.info('handleSelect::', item);
      setSelected(item);
      onSelect(item.abbr);
    },
    [onSelect]
  );
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-slate-800">
              {selected?.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((station, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={station}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {station.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

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
          <MyList items={stations} onSelect={handleOrigin} />
        </div>
        <div className="w-full">
          <div className="text-xs font-thin">destination:</div>
          <MyList items={stations} onSelect={handleDestination} />
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
