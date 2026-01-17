export interface Service {
  name: string;
  display_name: string;
  icon_url: string;
  oauth_url: string;
  actions: ServiceAction[];
  reactions: ServiceReaction[];
}

export interface ServiceAction {
  name: string;
  display_name: string;
  description: string;
  config_schema: string | null;
}

export interface ServiceReaction {
  name: string;
  display_name: string;
  description: string;
  config_schema: string | null;
}

export interface UserService {
  id: string;
  service_id: string;
  is_connected: boolean;
  last_sync: string | null;
  created_at: string;
  service: {
    name: string;
    display_name: string;
    icon_url: string;
  };
}

export interface UserServicesResponse {
  success: boolean;
  data: UserService[];
}

export interface AboutResponse {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: Service[];
  };
}
