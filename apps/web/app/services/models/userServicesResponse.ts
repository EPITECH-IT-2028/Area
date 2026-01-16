import { UserServiceRequest } from "./userServicesRequest";

export interface UserServicesResponse {
  success: boolean;
  data: UserServiceRequest[];
}
