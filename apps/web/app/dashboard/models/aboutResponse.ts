export interface ConfigProperty {
  description?: string;
  type?: string;
  default?: string | number | boolean;
  format?: string;
  properties?: Record<string, ConfigProperty>;
  enum?: (string | number)[];
  required?: string[];
}

export interface ConfigSchema {
  properties: Record<string, ConfigProperty>;
  required?: string[];
  type?: string;
}

export interface Action {
  name: string;
  description: string;
  config_schema: ConfigSchema | null;
  available_variables?: string[];
}

export interface Reaction {
  name: string;
  description: string;
  config_schema: ConfigSchema | null;
}

export interface Service {
  name: string;
  display_name: string;
  icon_url: string;
  actions: Action[];
  reactions: Reaction[];
}

export interface ServerInfo {
  current_time: number;
  services: Service[];
}

export interface ClientInfo {
  host: string;
}

export interface AboutResponse {
  client: ClientInfo;
  server: ServerInfo;
}

export interface CreateAreaRequest {
  name: string;
  description?: string;
  is_active: boolean;
  action_name: string;
  action_config: Record<string, unknown>;
  reaction_name: string;
  reaction_config: Record<string, unknown>;
}
