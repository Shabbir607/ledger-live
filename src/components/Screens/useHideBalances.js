import { useState, useEffect } from 'react';

export const useHideBalances = () => {
  const [hideBalances, setHideBalances] = useState(() => {
    const saved = localStorage.getItem('hideBalances');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('hideBalances', hideBalances.toString());
  }, [hideBalances]);

  return [hideBalances, setHideBalances];
};