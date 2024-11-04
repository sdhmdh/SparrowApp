import { useSelector } from "react-redux";
import { RateCard } from "./RateCard";
import { RootState } from "../redux/store";
import type { LenderWithCalculation } from "../types";
import "../styles/components/preQualifiedRatesTable.scss";

const Rates = () => {
  const { topPrequalifiedRates, otherRates } = useSelector(
    (state: RootState) => state.rates
  );

  return (
    <div id="rates" className="pre-qualified-rates-table">
      <h4 className="rates-title">Best Rates</h4>
      {topPrequalifiedRates.map((rate: LenderWithCalculation) => (
        <RateCard key={rate?.id} rateObj={rate} rateType="bestRates" />
      ))}
      <h4 className="rates-title">Other Rates</h4>
      {otherRates.map((rate: LenderWithCalculation) => (
        <RateCard key={rate?.id} rateObj={rate} rateType="otherRates" />
      ))}
    </div>
  );
};

export { Rates };
