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

const ServiceAlert = ({ advisory, onClick }) => {
  return (
    <div className="flex items-center justify-between p-2 border border-red-500 rounded">
      <div className="flex mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div className="flex w-full">{advisory}</div>
      <div className="flex self-start ml-2 ">
        <button onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
