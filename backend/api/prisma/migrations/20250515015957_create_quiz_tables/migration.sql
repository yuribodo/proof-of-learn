/*
  Warnings:

  - You are about to drop the column `time_per_hour_commitment` on the `roadmaps` table. All the data in the column will be lost.
  - Added the required column `hours_per_day_commitment` to the `roadmaps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roadmaps" DROP COLUMN "time_per_hour_commitment",
ADD COLUMN     "hours_per_day_commitment" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "roadmap_quiz_questions" (
    "id" UUID NOT NULL,
    "roadmap_id" UUID NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "roadmap_quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_quiz_answer" (
    "id" UUID NOT NULL,
    "roadmap_quiz_questions_id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roadmap_quiz_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_quiz_user_answer" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "roadmap_quiz_questions_id" UUID NOT NULL,
    "roadmap_quiz_questions_answer_id" UUID NOT NULL,

    CONSTRAINT "roadmap_quiz_user_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "roadmap_quiz_questions" ADD CONSTRAINT "roadmap_quiz_questions_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_answer" ADD CONSTRAINT "roadmap_quiz_answer_roadmap_quiz_questions_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_id") REFERENCES "roadmap_quiz_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_id") REFERENCES "roadmap_quiz_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_answer_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_answer_id") REFERENCES "roadmap_quiz_answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
