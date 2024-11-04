import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import type { Lender, User } from "../types";
import "../styles/components/greet.scss";

const Greet = () => {
  const user: User | null = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const lenders: Lender[] | null = useSelector(
    (state: RootState) => state.preQualifiedLenders.list
  );

  return (
    <div className="greet-user">
      <div className="content">
        <h4>
          Congratulations, {user?.username}! You’re pre-qualified for{" "}
          <span>{lenders?.length} rates!</span>
        </h4>
        <p>
          Click{" "}
          <a href="#rates">
            <b>Apply</b>
          </a>{" "}
          once you've chosen your rate, we’ll handle the rest.
        </p>
      </div>
    </div>
  );
};

export { Greet };
