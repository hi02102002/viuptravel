import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_blocks_nav_link_5" CASCADE;
  DROP TABLE "header_blocks_nav_link_4" CASCADE;
  DROP TYPE "public"."enum_header_blocks_nav_link_5_custom_url";
  DROP TYPE "public"."enum_header_blocks_nav_link_4_custom_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_blocks_nav_link_5_custom_url" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_blocks_nav_link_4_custom_url" AS ENUM('internal', 'external');
  CREATE TABLE IF NOT EXISTS "header_blocks_nav_link_5" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"custom_url" "enum_header_blocks_nav_link_5_custom_url" DEFAULT 'internal',
  	"url" varchar,
  	"is_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_blocks_nav_link_4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"custom_url" "enum_header_blocks_nav_link_4_custom_url" DEFAULT 'internal',
  	"url" varchar,
  	"is_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "header_blocks_nav_link_5" ADD CONSTRAINT "header_blocks_nav_link_5_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_blocks_nav_link_4" ADD CONSTRAINT "header_blocks_nav_link_4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_order_idx" ON "header_blocks_nav_link_5" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_parent_id_idx" ON "header_blocks_nav_link_5" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_path_idx" ON "header_blocks_nav_link_5" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_order_idx" ON "header_blocks_nav_link_4" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_parent_id_idx" ON "header_blocks_nav_link_4" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_path_idx" ON "header_blocks_nav_link_4" USING btree ("_path");`)
}
