import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline';
import React, { FC, Fragment, useEffect, useState } from 'react';

interface IOption {
  key: string;
  value: string | number;
}

interface Props {
  list: IOption[];
  title?: string;
  defaultSelected?: number;
  onChange?: (selected: IOption) => void;
}

const Dropdown: FC<Props> = ({
  list,
  title,
  defaultSelected,
  onChange,
}: Props) => {
  const [selected, setSelected] = useState<IOption | undefined>(
    typeof defaultSelected !== 'undefined' ? list[defaultSelected] : undefined
  );

  const handleChange = (value: any) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-fit cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {title ? title : selected?.['value']}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map((item, itemIdx) => (
              <Listbox.Option
                key={item.key}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Dropdown;
