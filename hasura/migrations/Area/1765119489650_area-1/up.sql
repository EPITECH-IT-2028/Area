-- Insert Google service
INSERT INTO services (name, display_name, description, icon_url, auth_type, base_url, is_active, config)
VALUES
  (
    'google',
    'Google',
    'Service Google pour authentification et lecture des emails',
    'https://www.google.com/favicon.ico',
    'oauth2',
    'https://www.googleapis.com',
    true,
    '{
      "oauth": {
        "authorization_url": "https://accounts.google.com/o/oauth2/v2/auth",
        "token_url": "https://oauth2.googleapis.com/token",
        "scopes": ["email", "profile", "https://www.googleapis.com/auth/gmail.modify"]
      }
    }'::jsonb
  )
ON CONFLICT (name) DO NOTHING;

INSERT INTO services (name, display_name, description, icon_url, auth_type, base_url, is_active, config)
VALUES
  (
    'discord_webhook',
    'Discord Webhook',
    'Service Discord pour envoyer des messages via webhook',
    'https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg',
    'none',
    'https://discord.com/api/webhooks',
    true,
    '{}'::jsonb
  )
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  gmail_service_id UUID;
  discord_service_id UUID;
BEGIN
  SELECT id INTO gmail_service_id FROM services WHERE name = 'google';
  SELECT id INTO discord_service_id FROM services WHERE name = 'discord_webhook';

  INSERT INTO actions (service_id, name, display_name, description, event_type, config_schema, is_active)
  VALUES (
    gmail_service_id,
    'new_email',
    'Nouvel email reçu',
    'Déclenché quand un nouvel email arrive',
    'email.received',
    '{
      "type": "object",
      "properties": {
        "from": {
          "type": "string",
          "description": "Filtrer par expéditeur (optionnel)"
        },
        "subject_contains": {
          "type": "string",
          "description": "Mots-clés dans le sujet (optionnel)"
        }
      }
    }'::jsonb,
    true
  )
  ON CONFLICT (service_id, name) DO NOTHING;

  INSERT INTO reactions (service_id, name, display_name, description, action_type, config_schema, is_active)
  VALUES (
    discord_service_id,
    'send_webhook_message',
    'Envoyer un message Discord',
    'Envoie un message via un webhook Discord (pas de connexion requise)',
    'webhook.send',
    '{
      "type": "object",
      "required": ["webhook_url"],
      "properties": {
        "webhook_url": {
          "type": "string",
          "description": "URL du webhook Discord",
          "format": "uri"
        },
        "message_template": {
          "type": "string",
          "description": "Template du message. Variables: {{from}}, {{subject}}, {{body}}",
          "default": "📧 Nouvel email de **{{from}}**\\nSujet: {{subject}}"
        }
      }
    }'::jsonb,
    true
  )
  ON CONFLICT (service_id, name) DO NOTHING;
END $$;
