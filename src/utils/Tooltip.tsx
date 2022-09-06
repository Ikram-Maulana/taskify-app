import { FC } from "react";

interface Props {
  children: string;
}

const Tooltip: FC<Props> = ({ children }) => {
  return (
    <span className="tooltip rounded shadow-lg text-base py-1 px-4 bg-[#6d6d6d] text-white -mt-10 text-center">
      {children}
    </span>
  );
};

export default Tooltip;
