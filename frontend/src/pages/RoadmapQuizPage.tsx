import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { roadmapService } from '@/services/roadmapService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizAnswerAPI {
  id: string;
  text: string;
}

interface QuizQuestionAPI {
  id: string;
  roadmapId: string;
  text: string;
  answers: QuizAnswerAPI[];
}

export default function RoadmapQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: quiz, isLoading, isError, error } = useQuery<QuizQuestionAPI[]>({
    queryKey: ['quiz', id!],
    queryFn: () => roadmapService.getQuiz(id!),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: (answers: { questionId: string; answerId: string }[]) =>
      roadmapService.submitQuiz(id!, answers),
    onSuccess: () => {
      toast.success('Quiz enviado com sucesso!');
      navigate(`/roadmap/${id}/quiz/result`);
    },
    onError: (err: any) => {
      const apiMessage = err?.response?.data?.error?.message;
      if (apiMessage === 'You already answered this roadmap quiz') {
        toast('Quiz já respondido. Redirecionando para resultados...');
        navigate(`/roadmap/${id}/quiz/result`);
      } else {
        toast.error(apiMessage || err.message || 'Erro ao enviar quiz');
      }
    },
  });

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6 animate-pulse">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="h-8 w-1/3 bg-gray-600 rounded mb-4" />
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-6 bg-gray-600 rounded" />
              ))}
          </div>
          <div className="flex justify-between mt-6">
            <div className="h-9 w-20 bg-gray-600 rounded" />
            <div className="h-9 w-20 bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!quiz) return <div>No quiz available.</div>;

  const total = quiz.length;
  const currentQuestion = quiz[currentStep];

  function handleSelect(questionId: string, answerId: string) {
    setSelected(prev => ({ ...prev, [questionId]: answerId }));
  }

  function handleSubmit(e?: React.MouseEvent) {
    e?.preventDefault();
    if (!quiz) return;
    // Ensure all questions answered
    if (Object.keys(selected).length !== quiz.length) {
      toast.error('Por favor, responda todas as questões antes de enviar');
      return;
    }
    const answers = quiz.map(q => ({ questionId: q.id, answerId: selected[q.id] }));
    submitMutation.mutate(answers);
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-heading font-bold mb-4">Roadmap Quiz</h1>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm">Question {currentStep + 1} of {total}</span>
          <div className="w-1/2 bg-[#4A4A5A] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6D4AFF] to-[#B668FF]"
              initial={false}
              animate={{ width: `${((currentStep + 1) / total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-[#2A2D3E] p-6 rounded-md"
          >
            <h2 className="text-xl font-medium mb-4">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.answers.map(answer => (
                <motion.label
                  key={answer.id}
                  className={`flex items-center gap-3 p-3 rounded-md $
                    selected[currentQuestion.id] === answer.id
                      ? 'bg-[#6D4AFF]/20'
                      : 'hover:bg-[#6D4AFF]/10'
                  }`}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={answer.id}
                    checked={selected[currentQuestion.id] === answer.id}
                    onChange={() => handleSelect(currentQuestion.id, answer.id)}
                    className="accent-[#6D4AFF] w-6 h-6 cursor-pointer"
                    required
                  />
                  <span className="text-base flex-1">{answer.text}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          <Button
            size="default"
            variant="outline"
            className='text-black cursor-pointer'
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >Previous</Button>
          {currentStep < total - 1 ? (
            <Button
              size="default"
              className='text-white cursor-pointer'
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!selected[currentQuestion.id]}
            >Next</Button>
          ) : (
            <Button
              size="default"
              className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={submitMutation.status === 'pending' || Object.keys(selected).length !== quiz.length}
            >{submitMutation.status === 'pending' ? 'Sending...' : 'Submit Quiz'}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
