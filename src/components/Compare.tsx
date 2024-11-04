import {
  PaymentsOverTimeChart,
  EstimatedCostChart,
  HorizontalCarousel,
} from "../components";
import { QuestionCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useCompare } from "../context/CompareSelectorsContext";
import type { LenderWithCalculationAndColor } from "../types";
import "../styles/components/compare.scss";

interface ChartCardProps {
  title: string;
  chart: string;
}

const ChartCard = ({ title, chart }: ChartCardProps) => {
  return (
    <div className="chart-card">
      <p>
        {title}
        <QuestionCircleFilled style={{ marginLeft: 5 }} />{" "}
      </p>
      <div className="chart-container">
        {chart === "paymentsOverTime" && <PaymentsOverTimeChart />}
        {chart === "estimatedCost" && <EstimatedCostChart />}
      </div>
    </div>
  );
};

interface CompareSelectorsProps {
  selector: LenderWithCalculationAndColor;
}

const CompareSelectors = ({ selector }: CompareSelectorsProps) => {
  const { removeFromCompare } = useCompare();
  const { id, lender, apr, term, color } = selector;

  const removeSelector = () => removeFromCompare(id);

  return (
    <div className="selector-card">
      <span className="indicator" style={{ background: color }}></span>
      <div className="lender">
        <div className="value">
          {apr}%, {term} years
        </div>
        <div className="name">{lender}</div>
      </div>
      <CloseCircleFilled onClick={removeSelector} />
    </div>
  );
};

const Compare = () => {
  const { compareSelectors } = useCompare();
  const charts = [
    { name: "paymentsOverTime", title: "Your payments over time" },
    { name: "estimatedCost", title: "Estimated Cost" },
  ];

  return (
    <>
      <div className="charts">
        {charts.map(({ name, title }) => (
          <ChartCard key={name} title={title} chart={name} />
        ))}
      </div>
      <div className="compare-selectors">
        <HorizontalCarousel itemsGap={10} scrollAmount={400}>
          {compareSelectors.map((selector: LenderWithCalculationAndColor) => (
            <CompareSelectors key={selector?.id} selector={selector} />
          ))}
        </HorizontalCarousel>
      </div>
    </>
  );
};

export { Compare };
