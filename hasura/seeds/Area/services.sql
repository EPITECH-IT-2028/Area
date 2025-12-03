INSERT INTO public.services (name, display_name, auth_type) VALUES
('google', 'Google', 'oauth2'),
('github', 'GitHub', 'oauth2')
ON CONFLICT (name) DO NOTHING;
