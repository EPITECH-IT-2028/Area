import { ServiceRequest, UserServiceRequest } from "@/app/services/models/serviceRequest";

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
