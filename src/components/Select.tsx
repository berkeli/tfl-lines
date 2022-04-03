import React from "react";

interface SelectProps {
  options: string[];
  selected: string;
  defaultText: string;
  selectHandler: (e: React.FormEvent) => void;
}

const Select = ({
  options,
  selected,
  defaultText,
  selectHandler,
}: SelectProps): JSX.Element => {
  return (
    <select
      aria-label={defaultText}
      className="form-select form-select-lg mb-3
                appearance-none
                block
                w-50
                my-3
                px-4
                py-2
                text-xl
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={(e) => selectHandler(e)}
      value={selected}
    >
      <option value="">{defaultText}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
