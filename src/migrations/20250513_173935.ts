import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_blocks_nav_link_4_custom_url" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_blocks_nav_link_3_custom_url" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_blocks_nav_link_2_custom_url" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_blocks_nav_link_1_custom_url" AS ENUM('internal', 'external');
  ALTER TABLE "header_blocks_nav_link_4" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_blocks_nav_link_4" ADD COLUMN "custom_url" "enum_header_blocks_nav_link_4_custom_url" DEFAULT 'internal';
  ALTER TABLE "header_blocks_nav_link_4" ADD COLUMN "url" varchar;
  ALTER TABLE "header_blocks_nav_link_4" ADD COLUMN "is_new_tab" boolean DEFAULT false;
  ALTER TABLE "header_blocks_nav_link_3" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_blocks_nav_link_3" ADD COLUMN "custom_url" "enum_header_blocks_nav_link_3_custom_url" DEFAULT 'internal';
  ALTER TABLE "header_blocks_nav_link_3" ADD COLUMN "url" varchar;
  ALTER TABLE "header_blocks_nav_link_3" ADD COLUMN "is_new_tab" boolean DEFAULT false;
  ALTER TABLE "header_blocks_nav_link_2" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_blocks_nav_link_2" ADD COLUMN "custom_url" "enum_header_blocks_nav_link_2_custom_url" DEFAULT 'internal';
  ALTER TABLE "header_blocks_nav_link_2" ADD COLUMN "url" varchar;
  ALTER TABLE "header_blocks_nav_link_2" ADD COLUMN "is_new_tab" boolean DEFAULT false;
  ALTER TABLE "header_blocks_nav_link_1" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_blocks_nav_link_1" ADD COLUMN "custom_url" "enum_header_blocks_nav_link_1_custom_url" DEFAULT 'internal';
  ALTER TABLE "header_blocks_nav_link_1" ADD COLUMN "url" varchar;
  ALTER TABLE "header_blocks_nav_link_1" ADD COLUMN "is_new_tab" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_blocks_nav_link_4" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_blocks_nav_link_4" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_blocks_nav_link_4" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "header_blocks_nav_link_4" DROP COLUMN IF EXISTS "is_new_tab";
  ALTER TABLE "header_blocks_nav_link_3" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_blocks_nav_link_3" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_blocks_nav_link_3" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "header_blocks_nav_link_3" DROP COLUMN IF EXISTS "is_new_tab";
  ALTER TABLE "header_blocks_nav_link_2" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_blocks_nav_link_2" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_blocks_nav_link_2" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "header_blocks_nav_link_2" DROP COLUMN IF EXISTS "is_new_tab";
  ALTER TABLE "header_blocks_nav_link_1" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_blocks_nav_link_1" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_blocks_nav_link_1" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "header_blocks_nav_link_1" DROP COLUMN IF EXISTS "is_new_tab";
  DROP TYPE "public"."enum_header_blocks_nav_link_4_custom_url";
  DROP TYPE "public"."enum_header_blocks_nav_link_3_custom_url";
  DROP TYPE "public"."enum_header_blocks_nav_link_2_custom_url";
  DROP TYPE "public"."enum_header_blocks_nav_link_1_custom_url";`)
}
