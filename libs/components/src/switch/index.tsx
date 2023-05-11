import React, { FC, useEffect, useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import classNames from 'classnames';

interface Props {
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  extraClasses?: string;
}

const Switch: FC<Props> = ({
  title,
  subtitle,
  disabled = false,
  defaultChecked = false,
  checked = false,
  extraClasses,
  onChange,
}) => {
  const [cchecked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleOnChange = (value: boolean) => {
    setChecked(value);
    onChange && onChange(value);
  };

  const handleOnClick = () => {
    setChecked(!cchecked);
    onChange && onChange(!cchecked);
  }

  return (
    <HeadlessSwitch.Group
      as="div"
      className={classNames('flex items-center mt-5', extraClasses)}
    >
      <HeadlessSwitch
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={handleOnChange}
        checked={cchecked}
        onClick={handleOnClick}
        className={classNames(
            cchecked ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-0 focus:ring-offset-0'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            cchecked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </HeadlessSwitch>
      {(title || subtitle) && (
        <HeadlessSwitch.Label as="span" className="ml-3">
          {title && (
            <span className="text-sm font-medium text-gray-900">{title}</span>
          )}
          {subtitle && (
            <span className="text-sm text-gray-500"> {subtitle}</span>
          )}
        </HeadlessSwitch.Label>
      )}
    </HeadlessSwitch.Group>
  );
};

export default Switch;
