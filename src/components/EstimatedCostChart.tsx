import {
  BarChart,
  Bar,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../components";
import { useCompare } from "../context/CompareSelectorsContext";
import { formatAmountWithCommas } from "../utils";
import type { LenderWithCalculationAndColor } from "../types";

type CustomChartTooltipProps = {
  value: number;
  label: string;
};

const EstimatedCostChart = () => {
  const { compareSelectors } = useCompare();

  const CustomChartTooltip = ({ value, label }: CustomChartTooltipProps) => {
    return (
      <CustomTooltip chart="bar">
        <p className="value">${formatAmountWithCommas(value)}</p>
        <p className="label">{label}</p>
      </CustomTooltip>
    );
  };
  if (compareSelectors.length === 0) {
    return <div>Please select items to compare</div>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={compareSelectors}>
        <CartesianGrid strokeDasharray="1 3" />
        <YAxis
          dataKey="totalCost"
          tick={{ fill: "#878F99", fontSize: 14 }}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          width={70}
        />
        <Tooltip
          content={({ active, payload }) =>
            active && payload && payload.length ? (
              <CustomChartTooltip
                value={Number(payload[0].value)}
                label="Total Cost"
              />
            ) : null
          }
        />
        <Bar dataKey="totalCost">
          {compareSelectors.map(
            (entry: LenderWithCalculationAndColor, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            )
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export { EstimatedCostChart };
