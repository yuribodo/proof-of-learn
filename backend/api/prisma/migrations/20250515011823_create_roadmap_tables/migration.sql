/*
  Warnings:

  - You are about to drop the column `business_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallet_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LearningStyle" AS ENUM ('VISUAL', 'AUDITORY', 'READING_WRITING');

-- CreateEnum
CREATE TYPE "KnowledgeLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "TopicContentType" AS ENUM ('TEXT', 'VIDEO');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "business_name",
DROP COLUMN "category_id",
DROP COLUMN "state",
ADD COLUMN     "wallet_address" TEXT;

-- CreateTable
CREATE TABLE "roadmaps" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "theme" TEXT NOT NULL,
    "learning_goal" TEXT NOT NULL,
    "knowledge_level" "KnowledgeLevel" NOT NULL,
    "time_per_hour_commitment" TEXT NOT NULL,
    "learning_style" "LearningStyle" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_topics" (
    "id" UUID NOT NULL,
    "roadmap_id" UUID NOT NULL,
    "topic_name" TEXT NOT NULL,
    "topic_description" TEXT NOT NULL,
    "topic_index" INTEGER NOT NULL,

    CONSTRAINT "roadmap_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_topic_contents" (
    "id" UUID NOT NULL,
    "roadmap_topic_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content_type" "TopicContentType" NOT NULL,
    "url" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roadmap_topic_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");

-- AddForeignKey
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_topics" ADD CONSTRAINT "roadmap_topics_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_topic_contents" ADD CONSTRAINT "roadmap_topic_contents_roadmap_topic_id_fkey" FOREIGN KEY ("roadmap_topic_id") REFERENCES "roadmap_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
