-- DropForeignKey
ALTER TABLE "roadmap_quiz_questions" DROP CONSTRAINT "roadmap_quiz_questions_roadmap_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmap_topic_contents" DROP CONSTRAINT "roadmap_topic_contents_roadmap_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "roadmap_topics" DROP CONSTRAINT "roadmap_topics_roadmap_id_fkey";

-- AddForeignKey
ALTER TABLE "roadmap_topics" ADD CONSTRAINT "roadmap_topics_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_topic_contents" ADD CONSTRAINT "roadmap_topic_contents_roadmap_topic_id_fkey" FOREIGN KEY ("roadmap_topic_id") REFERENCES "roadmap_topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_quiz_questions" ADD CONSTRAINT "roadmap_quiz_questions_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
