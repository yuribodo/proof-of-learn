-- DropForeignKey
ALTER TABLE "roadmap_quiz_answer" DROP CONSTRAINT "roadmap_quiz_answer_roadmap_quiz_questions_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmap_quiz_user_answer" DROP CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmap_quiz_user_answer" DROP CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmap_quiz_user_answer" DROP CONSTRAINT "roadmap_quiz_user_answer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmaps" DROP CONSTRAINT "roadmaps_user_id_fkey";

-- AddForeignKey
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_answer" ADD CONSTRAINT "roadmap_quiz_answer_roadmap_quiz_questions_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_id") REFERENCES "roadmap_quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_id") REFERENCES "roadmap_quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_roadmap_quiz_questions_answer_id_fkey" FOREIGN KEY ("roadmap_quiz_questions_answer_id") REFERENCES "roadmap_quiz_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_user_answer" ADD CONSTRAINT "roadmap_quiz_user_answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
