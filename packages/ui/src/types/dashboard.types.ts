type TDashData = {
  period: string;
  totalrevenue: string;
  commissionrevenue: string;
  totalorders: string;
  totalcompleted: string;
  totalcancelled: string;
  totalpending: string;
  totalinprogress: string;
};

export type TDashboardData = {
  daily: TDashData[];
  weekly: TDashData[];
  monthly: TDashData[];
  yearly: TDashData[];
};
