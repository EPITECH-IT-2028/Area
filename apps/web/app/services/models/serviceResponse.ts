export interface ServiceResponse {
  name: string;
  display_name: string;
  icon_url: string;
  actions: Array<{
    id: string;
    name: string;
    display_name: string;
    description: string;
  }>;
  reactions: Array<{
    id: string;
    name: string;
    display_name: string;
    description: string;
  }>;
}

export interface AboutResponse {
  client: { host: string };
  server: {
    current_time: number;
    services: ServiceResponse[];
  };
}