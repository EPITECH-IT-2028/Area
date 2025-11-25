-- Drop triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_areas_updated_at ON areas;
DROP TRIGGER IF EXISTS update_user_services_updated_at ON user_services;
DROP TRIGGER IF EXISTS update_reactions_updated_at ON reactions;
DROP TRIGGER IF EXISTS update_actions_updated_at ON actions;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop indexes
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_password;
DROP INDEX IF EXISTS idx_users_created_at;
DROP INDEX IF EXISTS idx_reactions_service_id;
DROP INDEX IF EXISTS idx_actions_service_id;
DROP INDEX IF EXISTS idx_hook_logs_created_at;
DROP INDEX IF EXISTS idx_hook_logs_area_id;
DROP INDEX IF EXISTS idx_areas_is_active;
DROP INDEX IF EXISTS idx_areas_reaction_id;
DROP INDEX IF EXISTS idx_areas_action_id;
DROP INDEX IF EXISTS idx_areas_user_id;
DROP INDEX IF EXISTS idx_user_services_service_id;
DROP INDEX IF EXISTS idx_user_services_user_id;

-- Drop tables (in reverse order due to foreign keys)
DROP TABLE IF EXISTS hook_logs;
DROP TABLE IF EXISTS areas;
DROP TABLE IF EXISTS user_services;
DROP TABLE IF EXISTS reactions;
DROP TABLE IF EXISTS actions;
DROP TABLE IF EXISTS services;