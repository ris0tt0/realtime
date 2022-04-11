import { isEqual } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getBsaListSelector } from '../../selectors/Advisories';
import PropTypes from 'prop-types';
import {
  EmojiHappyIcon,
  ExclamationIcon,
  XCircleIcon,
} from '@heroicons/react/outline';

const useBsaListProps = () => {
  const bsa = useSelector(getBsaListSelector);
  const bsaRef = useRef({});
  const [list, setLists] = useState([]);

  useEffect(() => {
    const list = bsa?.bsa?.map((item) => item.description['#cdata-section']);

    if (!isEqual(list, bsaRef.current)) {
      bsaRef.current = list;
      setLists(list);
    }
  }, [bsa]);

  return list;
};

const ServiceNoDelay = ({ advisory, onClick }) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded border-info-main">
      <div className="flex mr-2">
        <EmojiHappyIcon className="w-6 h-6 text-info-main" />
      </div>
      <div className="flex w-full">{advisory}</div>
      <div className="flex self-start ml-2 ">
        <button onClick={onClick}>
          <XCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
ServiceNoDelay.propTypes = {
  advisory: PropTypes.string,
  onClick: PropTypes.func,
};

const ServiceAlert = ({ advisory, onClick }) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded border-warning-main">
      <div className="flex mr-2">
        <ExclamationIcon className="w-6 h-6 text-warning-main" />
      </div>
      <div className="flex w-full">{advisory}</div>
      <div className="flex self-start ml-2 ">
        <button onClick={onClick}>
          <XCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

ServiceAlert.propTypes = {
  advisory: PropTypes.string,
  onClick: PropTypes.func,
};

const Results = () => {
  const list = useBsaListProps();
  const [showAdvisory, setShowAdvisory] = useState({});
  const handleClick = useCallback(
    (index) => {
      setShowAdvisory({ ...showAdvisory, [index]: true });
    },
    [showAdvisory]
  );

  const advisories = useMemo(() => {
    return list?.map((advisory, index) => {
      if (!showAdvisory[index]) {
        if (advisory.toLowerCase().includes('no delays')) {
          return (
            <ServiceNoDelay
              key={index}
              advisory={advisory}
              onClick={() => handleClick(index)}
            />
          );
        }
        return (
          <ServiceAlert
            key={index}
            advisory={advisory}
            onClick={() => handleClick(index)}
          />
        );
      }
      return null;
    });
  }, [list, showAdvisory]);

  return (
    <div className="flex flex-col w-full p-2 space-y-2 text-xs">
      {advisories}
    </div>
  );
};

export default Results;
