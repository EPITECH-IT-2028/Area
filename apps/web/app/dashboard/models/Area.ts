export interface HookLog {
  id: string;
  status: string;
  error_message?: string;
  execution_time_ms?: number;
  created_at: string;
}

export interface Area {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  action: {
    name: string;
    event_type: string;
    service: {
      name: string;
    };
  };
  reaction: {
    name: string;
    action_type: string;
    service: {
      name: string;
    };
  };
  hook_logs?: HookLog[];
}

export interface AreasResponse {
  success: boolean;
  data: Area[];
}
