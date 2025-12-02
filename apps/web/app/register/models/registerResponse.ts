export interface RegisterResponse {
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
