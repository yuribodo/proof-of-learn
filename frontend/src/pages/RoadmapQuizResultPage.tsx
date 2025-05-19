import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { roadmapService } from '@/services/roadmapService';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface QuizResultAPI {
  totalQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  scorePercentage: number;
  correctAnswers: { questionId: string; answerId: string; question?: string; answer?: string }[];
  wrongAnswers: { questionId: string; answerId: string; question?: string; answer?: string }[];
}

export default function RoadmapQuizResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<QuizResultAPI>({
    queryKey: ['quizResult', id!],
    queryFn: () => roadmapService.getQuizScore(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6 animate-pulse">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="h-8 w-1/4 bg-gray-600 rounded mb-4" />
          <div className="h-48 bg-gray-600 rounded mb-4" />
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-4 bg-gray-600 rounded" />
              ))}
          </div>
          <div className="h-9 w-32 bg-gray-600 rounded mt-6 mx-auto" />
        </div>
      </div>
    );
  }
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>No result data available.</div>;
  const result = data;

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-heading font-bold mb-6">Quiz Result</h1>
        <div className="bg-[#2A2D3E] p-6 rounded-md mb-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className="text-[48px] font-bold text-[#41E988]">
              {result.scorePercentage.toFixed(0)}%
            </span>
          </motion.div>
          <p className="mt-2 text-sm text-[#E0E0E0]/80">
            You got {result.totalCorrect} out of {result.totalQuestions} questions right
          </p>
        </div>

        {result.correctAnswers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3 text-[#41E988]">Correct Answers</h2>
            <ul className="list-disc list-inside space-y-2">
              {result.correctAnswers.map(item => (
                <li key={item.questionId} className="bg-[#2A2D3E] p-4 rounded-md">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-[#E0E0E0]">Answer: {item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.wrongAnswers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3 text-[#FF6B6B]">Wrong Answers</h2>
            <ul className="list-disc list-inside space-y-2">
              {result.wrongAnswers.map(item => (
                <li key={item.questionId} className="bg-[#2A2D3E] p-4 rounded-md">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-[#E0E0E0]">Your answer: {item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <Button
            className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer"
            onClick={() => navigate(`/roadmap/${id}`)}
          >
            Back to Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
}
