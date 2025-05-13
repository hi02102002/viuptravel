import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_blocks_nav_link_5_custom_url" AS ENUM('internal', 'external');
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
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_blocks_nav_link_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_blocks_nav_link_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_blocks_nav_link_1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer,
  	"tours_id" integer
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
  
  DO $$ BEGIN
   ALTER TABLE "header_blocks_nav_link_3" ADD CONSTRAINT "header_blocks_nav_link_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_blocks_nav_link_2" ADD CONSTRAINT "header_blocks_nav_link_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_blocks_nav_link_1" ADD CONSTRAINT "header_blocks_nav_link_1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_order_idx" ON "header_blocks_nav_link_5" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_parent_id_idx" ON "header_blocks_nav_link_5" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_5_path_idx" ON "header_blocks_nav_link_5" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_order_idx" ON "header_blocks_nav_link_4" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_parent_id_idx" ON "header_blocks_nav_link_4" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_4_path_idx" ON "header_blocks_nav_link_4" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_3_order_idx" ON "header_blocks_nav_link_3" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_3_parent_id_idx" ON "header_blocks_nav_link_3" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_3_path_idx" ON "header_blocks_nav_link_3" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_2_order_idx" ON "header_blocks_nav_link_2" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_2_parent_id_idx" ON "header_blocks_nav_link_2" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_2_path_idx" ON "header_blocks_nav_link_2" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_1_order_idx" ON "header_blocks_nav_link_1" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_1_parent_id_idx" ON "header_blocks_nav_link_1" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_blocks_nav_link_1_path_idx" ON "header_blocks_nav_link_1" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_categories_id_idx" ON "header_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_rels_tours_id_idx" ON "header_rels" USING btree ("tours_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_blocks_nav_link_5" CASCADE;
  DROP TABLE "header_blocks_nav_link_4" CASCADE;
  DROP TABLE "header_blocks_nav_link_3" CASCADE;
  DROP TABLE "header_blocks_nav_link_2" CASCADE;
  DROP TABLE "header_blocks_nav_link_1" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TYPE "public"."enum_header_blocks_nav_link_5_custom_url";`)
}
