import { User, Lender, LenderWithCalculation, LoanRates } from "./types";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
const calculateMonthlyPayment = (
  loanAmount: number,
  apr: number,
  termYears: number
): number => {
  const monthlyRate = apr / 100 / 12;
  const termMonths = termYears * 12;
  return (
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))
  );
};

export function calculateLoanRates(
  lendersList: Lender[],
  loanAmount: User["requestedLoanAmount"]
): LoanRates {
  // calculating each lender's monthly payment and total cost, and adding to lenders list
  const lendersWithCalculations: LenderWithCalculation[] = lendersList.map(
    (lender) => {
      const monthlyPayment: number = calculateMonthlyPayment(
        loanAmount,
        lender.apr,
        lender.term
      );
      const totalCost = monthlyPayment * lender.term * 12;

      return {
        ...lender,
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        totalCost: parseFloat(totalCost.toFixed(2)),
      };
    }
  );

  // sorting lenders by APR, term in ascending order, and then total cost
  const sortedLenders = lendersWithCalculations.sort((a, b) => {
    if (a.apr !== b.apr) return a.apr - b.apr;
    if (a.term !== b.term) return a.term - b.term;
    return a.totalCost - b.totalCost;
  });

  // split top 5 as best prequalified rates and rest as other rates
  const topPrequalifiedRates = sortedLenders.slice(0, 5);
  const otherRates = sortedLenders.slice(5);

  return {
    topPrequalifiedRates,
    otherRates,
  };
}

export function generateAmortizationData(
  loanAmount: number,
  apr: number,
  term: number,
  monthlyPayment: number
) {
  const monthlyRate = apr / 100 / 12;
  const numberOfPayments = term * 12;
  let balance = loanAmount;
  const amortizationData = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    amortizationData.push({
      date: new Date().getFullYear() + Math.floor(i / 12),
      balance: balance > 0 ? balance : 0,
    });
  }

  return amortizationData;
}

export function getModifiedColumnValueForRates(
  columnKey: string,
  value: number | string
): string {
  switch (columnKey) {
    case "apr":
      return value + "%";
    case "term":
      return value + " yrs";
    case "monthlyPayment":
      return "$" + value;
    case "totalCost":
      return "$" + value;
    default:
      return "";
  }
}

export function formatAmountWithCommas(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function generateMonthlyData({
  term,
  apr,
  monthlyPayment,
}: {
  term: number;
  apr: number;
  monthlyPayment: number;
}) {
  const totalMonths = term * 12;
  const monthlyRate = apr / 100 / 12;
  let remainingPrincipal = 50000;
  const monthlyData = [];

  for (let month = 0; month < totalMonths; month++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;

    monthlyData.push({
      x: new Date().setMonth(new Date().getMonth() + month),
      y: Math.max(remainingPrincipal, 0),
      amountRemaining: {
        principal: Math.max(remainingPrincipal, 0).toFixed(2),
        interest: interestPayment.toFixed(2),
      },
      amountPaid: {
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
      },
      avgMonthlyPayment: monthlyPayment.toFixed(2),
      timeUntilLoanPaidInDays: (totalMonths - month) * 30,
    });
  }
  return monthlyData;
}
