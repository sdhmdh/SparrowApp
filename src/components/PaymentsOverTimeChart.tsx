import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  TooltipModel,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { generateMonthlyData } from "../utils";
import { useCompare } from "../context/CompareSelectorsContext";
import type { User, LenderWithCalculationAndColor } from "../types";
import { RootState } from "../redux/store";
import "../styles/components/compare.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

interface TooltipDataPoint {
  amountPaid: { principal: string; interest: string };
  amountRemaining: { principal: string; interest: string };
  avgMonthlyPayment: string;
  timeUntilLoanPaidInDays: number;
  x: number;
  y: number;
}

interface ExternalTooltipContext {
  tooltip: TooltipModel<"line">;
  chart: { canvas: HTMLCanvasElement };
}

const PaymentsOverTimeChart = () => {
  const user: User | null = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const { compareSelectors } = useCompare();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (user) {
      const chartData = {
        datasets: compareSelectors.map(
          (lender: LenderWithCalculationAndColor) => ({
            label: `${lender.lender} (${lender.apr}%, ${lender.term} years)`,
            data: generateMonthlyData(lender, user?.requestedLoanAmount),
            borderColor: lender.color,
            backgroundColor: lender.color,
            fill: false,
            parsing: false,
          })
        ),
      };
      setData(chartData);
    }
  }, [compareSelectors]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) =>
            `$${Number(value).toLocaleString()}`,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: function (context: ExternalTooltipContext) {
          let tooltipEl = document.getElementById("chart-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chart-tooltip";
            tooltipEl.style.opacity = "0";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.background = "#1c1c28";
            tooltipEl.style.color = "#fff";
            tooltipEl.style.borderRadius = "8px";
            tooltipEl.style.padding = "15px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.zIndex = "1000";
            tooltipEl.style.fontFamily = "Arial, sans-serif";
            tooltipEl.style.maxWidth = "250px";
            tooltipEl.innerHTML = "<div></div>";
            document.body.appendChild(tooltipEl);
          }

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const {
            amountPaid,
            amountRemaining,
            avgMonthlyPayment,
            timeUntilLoanPaidInDays,
          } = tooltipModel.dataPoints[0].raw as TooltipDataPoint;

          const date = new Date(
            tooltipModel.dataPoints[0].raw.x
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          const innerHtml = `
            <div style="font-weight: bold; margin-bottom: 10px;">When you're on ${date}</div>
            <div style="margin-bottom: 10px;"><strong>Total Amount Remaining</strong></div>
            <div>Interest: $${parseFloat(
              amountRemaining.interest
            ).toLocaleString()}</div>
            <div>Principal: $${parseFloat(
              amountRemaining.principal
            ).toLocaleString()}</div>
            <div style="margin: 10px 0;"><strong>Total Amount Paid</strong></div>
            <div>Interest: $${parseFloat(
              amountPaid.interest
            ).toLocaleString()}</div>
            <div>Principal: $${parseFloat(
              amountPaid.principal
            ).toLocaleString()}</div>
            <div style="margin: 10px 0;"><strong>Avg. Monthly Payment</strong></div>
            <div>$${parseFloat(avgMonthlyPayment).toLocaleString()}</div>
            <div style="margin-top: 10px;"><strong>Total time remaining until loan paid in full</strong></div>
            <div>${timeUntilLoanPaidInDays} days</div>
          `;

          const divRoot = tooltipEl.querySelector("div")!;
          divRoot.innerHTML = innerHtml;

          // Position the tooltip based on available screen space
          const position = context.chart.canvas.getBoundingClientRect();
          const tooltipWidth = tooltipEl.offsetWidth;
          const tooltipHeight = tooltipEl.offsetHeight;

          // Define positioning variables
          let left = position.left + window.scrollX + tooltipModel.caretX;
          let top = position.top + window.scrollY + tooltipModel.caretY;

          // Calculate if the tooltip overflows the right edge of the screen
          if (left + tooltipWidth > window.innerWidth) {
            tooltipEl.style.right = "10px";
            tooltipEl.style.left = "auto";
          } else if (left < 10) {
            tooltipEl.style.left = "10px";
            tooltipEl.style.right = "auto";
          } else {
            tooltipEl.style.left = `${left}px`;
            tooltipEl.style.right = "auto";
          }

          // Calculate if the tooltip overflows the bottom edge of the screen
          if (top + tooltipHeight > window.innerHeight) {
            tooltipEl.style.bottom = "10px";
            tooltipEl.style.top = "auto";
          } else if (top < 10) {
            tooltipEl.style.top = "10px";
            tooltipEl.style.bottom = "auto";
          } else {
            tooltipEl.style.top = `${top}px`;
            tooltipEl.style.bottom = "auto";
          }

          tooltipEl.style.opacity = "1";
        },
      },
      legend: {
        display: false,
      },
    },
  };

  if (compareSelectors.length === 0) {
    return <div>Please select items to compare</div>;
  }

  return (
    <Line
      data={data}
      options={options}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export { PaymentsOverTimeChart };
