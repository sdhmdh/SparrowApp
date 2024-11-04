import { ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  DollarOutlined,
  ReadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { formatAmountWithCommas } from "../utils";
import type { User } from "../types";
import { RootState } from "../redux/store";
import "../styles/components/userDetails.scss";

type DetailCardProps = {
  id: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

const DetailCard = (props: DetailCardProps) => {
  const { id, icon, title, children } = props;
  return (
    <div key={id} className="card-detail">
      <div className="card-icon-text">
        {icon} <span className="text">{title}</span>
      </div>
      {children}
    </div>
  );
};

const userDetails = [
  {
    id: "loanSize",
    title: "Loan Size",
    icon: <SearchOutlined />,
  },
  {
    id: "annualIncome",
    title: "Annual Income",
    icon: <DollarOutlined />,
  },
  {
    id: "education",
    title: "Education",
    icon: <ReadOutlined />,
  },
  {
    id: "cosigner",
    title: "Cosigner",
    icon: <UserAddOutlined />,
  },
];

const UserDetails = () => {
  const user: User | null = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const getDetailValue = (detailKey: string): string => {
    switch (detailKey) {
      case "loanSize":
        return "$" + formatAmountWithCommas(user?.requestedLoanAmount ?? 0);
      case "annualIncome":
        return "$" + formatAmountWithCommas(user?.annualIncome ?? 0);
      case "education":
        return "Stanford University";
      case "cosigner":
        return "Add a cosigner";
      default:
        return "";
    }
  };

  return (
    <div className="detail-card-container">
      {user &&
        userDetails.map(({ id, icon, title }) => (
          <DetailCard key={id} id={id} icon={icon} title={title}>
            <div>{getDetailValue(id)}</div>
          </DetailCard>
        ))}
    </div>
  );
};

export { UserDetails };
