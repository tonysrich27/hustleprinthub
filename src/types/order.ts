export interface OrderSummaryLine {
  label: string;
  value: string;
}

export interface OrderSummaryPanelProps {
  title?: string;
  lines: OrderSummaryLine[];
  total?: number | string | null;
  totalLabel?: string;
  footer?: string;
  sticky?: boolean;
}
