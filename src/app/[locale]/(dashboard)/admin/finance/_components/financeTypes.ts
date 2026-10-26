export interface ServiceRevenueItem {
  service_name: string;
  category: string;
  total_amount: number;
  count: number;
}

export interface TrendItem {
  date?: string;
  month?: string;
  amount: number;
  count: number;
}

export interface StatusItem {
  status: string;
  count: number;
  amount: number;
}

export interface PaymentRecord {
  id: string;
  application: string;
  checkout_request_id?: string;
  receipt_number?: string;
  amount: string | number;
  phone_number: string;
  status: "Completed" | "Pending" | "Failed" | string;
  mpesa_response?: any;
  created_at: string;
  updated_at: string;
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  organization_name?: string;
  service_name?: string;
  service_category?: string;
  service_fee?: string | number;
  application_status?: string;
}

export interface FinanceAnalyticsData {
  total_collected: number;
  total_pending: number;
  total_failed: number;
  total_requests: number;
  completed_count: number;
  pending_count: number;
  failed_count: number;
  collection_rate: number;
  average_transaction_value: number;
  services_data: ServiceRevenueItem[];
  daily_trend: TrendItem[];
  monthly_trend: TrendItem[];
  status_distribution: StatusItem[];
  recent_transactions: PaymentRecord[];
}

export interface FinanceDashboardViewProps {
  isMainDashboard?: boolean;
}
