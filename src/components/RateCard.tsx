import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareSelectorsContext";
import comapareSvg from "../assets/compare.svg";
import bookmark from "../assets/bookmark.svg";
import comapareFilledSvg from "../assets/compare-filled.svg";
import bookmarkFilledSvg from "../assets/bookmark-filled.svg";
import {
  getModifiedColumnValueForRates,
  formatAmountWithCommas,
} from "../utils";
import type { LenderWithCalculation } from "../types";
import { setLenderBookmark } from "../service/Httpcalls";
import "../styles/components/rateCard.scss";

type ColumnValue = string | number;

interface LoanDetailCardProps {
  detailKey: string;
  columnKey: string;
  columnTitle: string;
  value: ColumnValue;
}

const LoanDetailCard = (props: LoanDetailCardProps) => {
  const { detailKey, columnKey, columnTitle, value } = props;
  return (
    <div key={detailKey} className="loan-detail-column">
      <h2>{columnTitle}</h2>
      <p>{getModifiedColumnValueForRates(columnKey, value)}</p>
    </div>
  );
};

interface RateCardProps {
  rateObj: LenderWithCalculation;
  rateType: string;
}

const RateCard = (props: RateCardProps) => {
  const { rateObj, rateType } = props;
  const { compareSelectors, addToCompare, removeFromCompare } = useCompare();
  const { id, lender, logo, apr, term, monthlyPayment, totalCost, bookmarked } =
    rateObj;
  const [isInCompare, setIsInCompare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  useEffect(() => {
    const lenderIndex = compareSelectors.findIndex(
      (selector: LenderWithCalculation) => selector.id === id
    );
    setIsInCompare(lenderIndex !== -1);
  }, [compareSelectors, id]);

  const columns = {
    apr: "APR",
    term: "Term",
    totalCost: "Total Cost",
  };

  const onCompareClick = () =>
    isInCompare ? removeFromCompare(rateObj.id) : addToCompare(rateObj);

  const onBookmarkClick = async () => {
    try {
      const newBookmarkedStatus = !isBookmarked;
      setIsBookmarked(newBookmarkedStatus);
      await setLenderBookmark(id, newBookmarkedStatus);
    } catch (error) {
      console.error("Failed to update bookmark status:", error);
      setIsBookmarked((prev) => !prev);
    }
  };

  const getColumnValue = (columnKey: string): ColumnValue => {
    switch (columnKey) {
      case "apr":
        return apr;
      case "term":
        return term;
      case "monthlyPayment":
        return formatAmountWithCommas(monthlyPayment);
      case "totalCost":
        return formatAmountWithCommas(totalCost);
      default:
        return "";
    }
  };

  return (
    <div className="rate-card" key={id}>
      <div className="rate-card-content">
        <img className="lender-logo" src={logo} alt="lender logo" />
        <div className="loan-details">
          <div className="lender">
            <h2>{lender}</h2>
            {rateType === "bestRates" && <p>Lowest total cost</p>}
          </div>
          <div className="loan-detail-columns-container">
            {Object.entries(columns).map((column) => (
              <LoanDetailCard
                key={column[0] + column[1]}
                detailKey={column[0] + column[1]}
                columnKey={column[0]}
                columnTitle={column[1]}
                value={getColumnValue(column[0])}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="rate-card-actions">
        <div className="action-item">
          <img
            className="compare"
            src={isInCompare ? comapareFilledSvg : comapareSvg}
            onClick={onCompareClick}
          />
        </div>
        <div className="action-item">
          <img
            className="bookmark"
            src={isBookmarked ? bookmarkFilledSvg : bookmark}
            onClick={onBookmarkClick}
          />
        </div>
        <button className="apply-to-loan-btn">Apply</button>
      </div>
    </div>
  );
};

export { RateCard };
