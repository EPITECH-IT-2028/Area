export interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
    created_at: string;
  };
}
