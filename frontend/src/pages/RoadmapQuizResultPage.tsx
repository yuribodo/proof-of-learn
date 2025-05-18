import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { roadmapService } from '@/services/roadmapService';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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

  if (isLoading) return <div>Carregando resultado...</div>;
  if (isError) return <div>Erro: {(error as Error).message}</div>;
  if (!data) return <div>Sem dados de resultado.</div>;
  const result = data;

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-heading font-bold mb-6">Resultado do Quiz</h1>
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
            Acertou {result.totalCorrect} de {result.totalQuestions} perguntas
          </p>
        </div>

        {result.correctAnswers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3 text-[#41E988]">Perguntas Corretas</h2>
            <ul className="list-disc list-inside space-y-2">
              {result.correctAnswers.map(item => (
                <li key={item.questionId} className="bg-[#2A2D3E] p-4 rounded-md">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-[#E0E0E0]">Resposta: {item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.wrongAnswers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3 text-[#FF6B6B]">Perguntas Erradas</h2>
            <ul className="list-disc list-inside space-y-2">
              {result.wrongAnswers.map(item => (
                <li key={item.questionId} className="bg-[#2A2D3E] p-4 rounded-md">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-[#E0E0E0]">Sua resposta: {item.answer}</p>
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
            Voltar ao Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
}
