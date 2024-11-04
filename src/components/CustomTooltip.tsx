import "../styles/components/customTooltip.scss";
import { ReactNode } from "react";

const CustomTooltip = ({
  chart,
  children,
}: {
  chart: string;
  children: ReactNode;
}) => {
  return <div className={`custom-tooltip ${chart}`}>{children}</div>;
};

export { CustomTooltip };
