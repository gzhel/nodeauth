import React, { ChangeEvent } from 'react';
import s from './index.module.scss';

export interface IControlledInput {
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  validationMessage: string | null;
}

export const ControlledInput = (p: IControlledInput) => {
  return (
    <div className={s.inputLayout}>
      <input
        className={s.input}
        onChange={p.onChange}
        value={p.value}
        type={p.type}
        placeholder={p.placeholder}
      />
      {!p.validationMessage ? null : (
        <span className={s.validationError}>{p.validationMessage}</span>
      )}
    </div>
  );
};
