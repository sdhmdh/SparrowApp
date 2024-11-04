type User = {
  email: string;
  username: string;
  annualIncome: number;
  requestedLoanAmount: number;
};

type Lender = {
  id: string;
  lender: string;
  logo: string;
  apr: number;
  term: number;
  bookmarked: boolean;
};

interface LenderWithCalculation extends Lender {
  monthlyPayment: number;
  totalCost: number;
}

interface LenderWithCalculationAndColor extends LenderWithCalculation {
  color: string;
}

interface LoanRates {
  topPrequalifiedRates: LenderWithCalculation[];
  otherRates: LenderWithCalculation[];
}

export type {
  User,
  Lender,
  LenderWithCalculation,
  LenderWithCalculationAndColor,
  LoanRates,
};
