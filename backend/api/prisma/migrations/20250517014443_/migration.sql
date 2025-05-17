/*
  Warnings:

  - Changed the type of `theme` on the `roadmaps` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('BLOCKCHAIN', 'PROGRAMMING', 'AI');

-- AlterTable
ALTER TABLE "roadmaps" DROP COLUMN "theme",
ADD COLUMN     "theme" "Theme" NOT NULL;
