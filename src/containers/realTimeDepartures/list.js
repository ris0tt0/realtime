import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Logger from 'js-logger';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommands } from '../../hooks/useCommands';
import { getRTDCurrentAbbrSelector } from '../../selectors/RealTimeDepartures';
import { getStationsListSelector } from '../../selectors/Station';

function RealTimeDeparturesList() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const stations = useSelector(getStationsListSelector);
  const currentAbbr = useSelector(getRTDCurrentAbbrSelector);
  const commands = useCommands();

  useEffect(() => {
    Logger.info('useEffect::currentAbbr', currentAbbr);
  }, [currentAbbr]);

  useEffect(() => {
    if (selected?.abbr) {
      setLoading(true);
      commands
        .setRTDStationAbbr(selected.abbr)
        .finally(() => setLoading(false));
    }
  }, [selected]);

  // useEffect(() => {
  //   setSelected(stations[0]);
  // }, [stations]);

  //   if (loading) {
  //     return <div>loading</div>;
  //   }

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
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
              {stations.map((station, personIdx) => (
                <Listbox.Option
                  key={personIdx}
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
}

export default RealTimeDeparturesList;
