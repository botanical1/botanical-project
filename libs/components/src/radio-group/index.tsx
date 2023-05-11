import classNames from 'classnames';
import { FC } from 'react';

interface IOption {
  key: string;
  value: string | number;
}

interface Props {
  groupName: string;
  checkedByDefault: string;
  onChange?: (value: IOption) => void;
  items: IOption[];
}

const RadioGroup: FC<Props> = ({
  groupName,
  checkedByDefault,
  items,
  onChange,
}) => {
  const renderItems = () =>
    items.map((item) => (
      <div className="flex items-center mt-3" key={item.key}>
        <input
          id={item.key}
          name={groupName}
          type="radio"
          onChange={() => onChange && onChange(item)}
          defaultChecked={checkedByDefault === item.key}
          className={classNames(
            'focus:ring-0 focus:ring-offset-0 h-4 w-4 text-indigo-600 border-gray-300'
          )}
        />
        <label
          htmlFor={item.key}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {item.value}
        </label>
      </div>
    ));
  return <div>{renderItems()}</div>;
};

export default RadioGroup;
