export interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  message: string;
}
