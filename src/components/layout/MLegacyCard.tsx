import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
};
const MLegacyCard = ({ title, children }: Props) => {
  return (
    <>
      <div className="relative m-4 p-5 w-full bg-white rounded-lg shadow-lg">
        <div className="mb-6 text-xl font-bold">{title}</div>
        {children}
      </div>
    </>
  );
};
export default MLegacyCard;
