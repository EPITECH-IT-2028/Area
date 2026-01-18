import { ServiceAction } from "./serviceAction";
import { ServiceReaction } from "./serviceReaction";

export interface ServiceRequest {
  name: string;
  display_name: string;
  icon_url: string;
  oauth_url: string;
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