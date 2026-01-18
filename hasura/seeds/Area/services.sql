UPDATE services
SET config = jsonb_set(
  config,
  '{oauth, scopes}',
  '["email", "profile", "https://www.googleapis.com/auth/gmail.modify"]'
)
WHERE name = 'google';

UPDATE services SET icon_url = 'https://discord.com/assets/favicon.ico' WHERE name = 'discord';
UPDATE services SET icon_url = 'https://statics.teams.cdn.office.net/hashed/favicon/prod/favicon-f1722d9.ico' WHERE name = 'teams';
