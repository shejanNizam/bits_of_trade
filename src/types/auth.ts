// ==================== TYPES (Aligned with your API) ====================
export interface SignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string; // Used locally in AntD form
  agree: boolean;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    subscription_type: string;
    profile_picture: string | null;
    created_at: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

// ==================== TYPES (Aligned with your API) ====================
export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    subscription_type: string;
    profile_picture: string | null;
    created_at: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface ApiError {
  success: boolean;
  data: {
    errors?: {
      field?: string;
      message?: string;
    }[];
    error: string;
  };
}
