import React from 'react';
import _ from 'lodash';
import s from './index.module.scss';

export interface IControlledButton {
  value: string;
  onClick: () => void;
}

export const ControlledButton = (p: IControlledButton) => {
  const onClickThrottle = _.throttle(p.onClick, 1000);

  return (
    <button className={s.button} onClick={onClickThrottle}>
      {p.value}
    </button>
  );
};
