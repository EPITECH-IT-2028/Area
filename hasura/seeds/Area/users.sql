INSERT INTO public.users (email, password, name) VALUES
('test@gmail.com', '$2b$10$4uQ7CIhgEB2pLQOYYp31teNzQAoJKD3FUxgIEaCPToYNycMwlYr3u', 'test user1')
ON CONFLICT (email) DO NOTHING;
