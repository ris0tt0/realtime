import Logger from 'js-logger';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commands } from '../commands';

const useCommands = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const commandsRef = useRef(commands(dispatch, {}));

  Logger.info('useCommands::');

  if (dispatch !== dispatchRef.current) {
    Logger.info('useCommands:: new dispatch commands');
    dispatchRef.current = dispatch;
    commandsRef.current = commands(dispatch, {});
  }

  return commandsRef.current;
};

export { useCommands };
