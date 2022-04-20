import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Commands } from '../commands';

const useCommands = () => {
  const dispatch = useDispatch();
  const [cmd, setCmd] = useState(Commands.getInstance(dispatch));
  useEffect(() => setCmd(Commands.getInstance(dispatch)), [dispatch]);

  return cmd;
};

export { useCommands };
