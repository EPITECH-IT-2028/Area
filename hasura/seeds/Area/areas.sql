INSERT INTO areas (
  user_id, 
  name, 
  description, 
  is_active, 
  action_id, 
  action_config, 
  reaction_id, 
  reaction_config
) VALUES (
  'cb5d5aa9-4261-435f-8496-2d522cf9f359',                                   
  'Teste email area',                                          
  'Notifier le canal #projets quand un email arrive avec ''test'' dans le sujet.',
  true,                                                  
  '53fdfecd-88b8-42dc-afed-e7f8ca45851d',                    
  '{
    "from": "etienne.lbre@gmail.com",
    "subject_contains": "test"
  }'::jsonb,
  'b6572f1d-7c2a-4ccd-b2bf-ffc6960a0ef6',
  '{
    "webhook_url": "https://discord.com/api/webhooks/1445813431126069391/byF3KAUcyhlnatbpzo91sZqaN25IMXYEND6FwQezJIyNfkP2Av81hennNzaxGwA-xbZ9",
    "message_template": "🚨 **Email Important Reçu !** - **De** : `{{from}}` - **Sujet** : `{{subject}}` - **Snippet** : {{snippet}}"
  }'::jsonb                                                             
)
