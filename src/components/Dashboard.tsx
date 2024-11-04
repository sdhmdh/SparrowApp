import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLenders,
  setLendersLoading,
  setLendersError,
} from "../redux/lendersSlice";
import { setTopPrequalifiedRates, setOtherRates } from "../redux/ratesSlice";
import { Greet, UserDetails, Compare, Rates } from "../components";
import { CompareProvider } from "../context/CompareSelectorsContext";
import { getPrequalifiedLenders } from "../service/Httpcalls";
import { calculateLoanRates } from "../utils";
import type { User, Lender } from "../types";
import { RootState, AppDispatch } from "../redux/store";
import "../styles/components/dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user: User | null = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const getLenders = async () => {
    try {
      dispatch(setLendersLoading(true));
      const res = await getPrequalifiedLenders();
      if (user && res && res.status === 200) {
        const calculatedRatesObj = calculateLoanRates(
          res.data as Lender[],
          user.requestedLoanAmount
        );
        const { topPrequalifiedRates, otherRates } = calculatedRatesObj;
        dispatch(setTopPrequalifiedRates(topPrequalifiedRates));
        dispatch(setOtherRates(otherRates));
        dispatch(setLenders(res.data));
      }
    } catch (e: any) {
      dispatch(setLendersError(e?.message));
    } finally {
      dispatch(setLendersLoading(false));
    }
  };

  useEffect(() => {
    getLenders();
  }, []);

  return (
    <div className="dashboard-container">
      <Greet />
      <UserDetails />
      <CompareProvider>
        <Compare />
        <Rates />
      </CompareProvider>
    </div>
  );
};

export { Dashboard };
