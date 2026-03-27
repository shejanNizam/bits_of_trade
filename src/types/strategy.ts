// types/strategy.ts
export interface Strategy {
  id: string;
  total_trades: number;
  win_rate: number;
  total_pnl: number;
  profit_factor: number;
  sample_size_progress: number;
  strategy_name: string;
  description: string;
  tags: string[];
  market_types: string[];
  trade_type: string;
  entry_rules: string[];
  exit_rules: string[];
  risk_management_rules: string[];
  is_public: boolean;
  is_template: boolean;
  maturity_status: string;
  sample_size_threshold: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  user: number;
  created_by_admin: null | string;
  source_strategy: null | string;
  closed_trades?: number;
}

export interface CreateStrategyPayload {
  strategy_name: string;
  description: string;
  tags: string[];
  market_types: string[];
  entry_rules: string[];
  exit_rules: string[];
  risk_management_rules: string[];
  trade_type: string;
  is_public: boolean;
  sample_size_threshold: number;
  maturity_status: string;
}

// Use type alias instead of interface
export type UpdateStrategyPayload = Partial<CreateStrategyPayload>;
