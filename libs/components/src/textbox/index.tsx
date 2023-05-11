import React, { FC, HTMLInputTypeAttribute } from 'react';

interface Props {
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
  defaultValue?: string;
  extraClasses?: string;
}

const TextBox: FC<Props> = ({
  name,
  onChange,
  defaultValue,
  type = 'text',
  placeholder = '',
  extraClasses,
}) => {
  return (
    <div
      className={`relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 ${extraClasses}`}
    >
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-[#fafafa] text-xs font-medium text-gray-900"
      >
        {name}
      </label>
      <input
        min={0}
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border-0 p-0 bg-[#fafafa] text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextBox;
