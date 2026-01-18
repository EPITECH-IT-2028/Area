ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "updated_at" timestamptz DEFAULT now();
ALTER TABLE "public"."users" ALTER COLUMN "updated_at" SET NOT NULL;
