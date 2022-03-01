import Logger from 'js-logger';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commands } from '../commands';

const useCommands = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef({});
  const commandsRef = useRef({});

  if (dispatch !== dispatchRef.current) {
    Logger.info('New use commands!!', dispatch, '-', dispatchRef.current);
    dispatchRef.current = dispatch;
    commandsRef.current = commands(dispatch, {});
  }

  return commandsRef.current;
};

export { useCommands };
