UPDATE services
SET config = jsonb_set(
  config,
  '{oauth, scopes}',
  '["email", "profile", "https://www.googleapis.com/auth/gmail.modify"]'
)
WHERE name = 'google';
