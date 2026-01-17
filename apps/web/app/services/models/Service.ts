import { ServiceAction, ServiceReaction } from "./Action";

export interface ServiceRequest {
  name: string;
  display_name: string;
  icon_url: string;
  oauth_url: string | null;
  actions: ServiceAction[];
  reactions: ServiceReaction[];
}

export interface UserServiceRequest {
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
  data: UserServiceRequest[];
}

export interface AboutResponse {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: ServiceRequest[];
  };
}
