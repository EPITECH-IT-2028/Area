export interface UserServiceRequest {
  id: string;
  service_id: string;
  is_connected: boolean;
  service: {
    id: string;
    name: string;
    display_name: string;
    icon_url?: string;
  };
}