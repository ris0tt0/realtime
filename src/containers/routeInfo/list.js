import Logger from 'js-logger';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../../components/DropDownList';
import { useCommands } from '../../hooks/useCommands';
import { getRoutesListSelector } from '../../selectors/Route';

const List = () => {
  const routes = useSelector(getRoutesListSelector);
  const commands = useCommands();
  const [loading, setLoading] = useState(false);

  useEffect(() => Logger.info('RouteInfoList::', loading), [loading]);

  const handleSelect = useCallback(
    (item) => {
      setLoading(true);
      commands.requestRouteInfo(item.number).finally(() => setLoading(false));
    },
    [commands]
  );

  //   if (loading) {
  //     return (
  //       <div
  //         className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin"
  //         role="status"
  //       >
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <DropDownList items={routes} onSelect={handleSelect} />
    </div>
  );
};

export default List;
