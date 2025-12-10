export interface OAuthResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
    created_at: string;
  };
}
