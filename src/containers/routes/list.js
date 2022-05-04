import Logger from 'js-logger';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../../components/DropDownList';
import { useCommands } from '../../hooks/useCommands';
import { getRoutesListSelector } from '../../selectors/route';
import { useRouteResultProps } from './hooks';

const List = () => {
  const routes = useSelector(getRoutesListSelector);
  const commands = useCommands();
  const route = useRouteResultProps();
  const [loading, setLoading] = useState(false);

  useEffect(() => Logger.info('RouteInfoList::', loading), [loading]);

  const handleSelect = useCallback(
    (item) => {
      setLoading(true);
      commands.requestRouteInfo(item.number).finally(() => setLoading(false));
    },
    [commands]
  );

  return (
    <div className="mx-2 ">
      <DropDownList value={route} items={routes} onSelect={handleSelect} />
    </div>
  );
};

export default List;
