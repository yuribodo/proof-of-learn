import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { roadmapService } from '@/services/roadmapService';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

interface RoadmapSummaryAPI {
  id: string;
  learningGoal: string;
  hoursPerDayCommitment: number;
}

function RoadmapsNavbar() {
  const { signedIn, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    signout();
    navigate('/');
  }
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#121212]/80 border-b border-white/10 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-[#6D4AFF] tracking-tight">
          Proof of Learn
        </Link>
        {signedIn && (
          <Button onClick={handleLogout} className="bg-[#EF4444] text-white hover:bg-[#b91c1c] cursor-pointer">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export function RoadmapsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const deleteMutation = useMutation<any, Error, string>({
    mutationFn: (id: string) => roadmapService.deleteRoadmap(id),
    onSuccess: () => {
      toast.success('Roadmap deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to delete roadmap');
    },
  });
  function openDeleteModal(id: string) {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  }
  function confirmDelete() {
    if (selectedId) deleteMutation.mutate(selectedId);
  }
  const { data: roadmaps, isLoading, isError, error } = useQuery<RoadmapSummaryAPI[]>({
    queryKey: ['roadmaps'],
    queryFn: async (): Promise<RoadmapSummaryAPI[]> => await roadmapService.getAllRoadmaps(),
  });

  if (isLoading) return <div>Carregando roadmaps...</div>;
  if (isError) return <div>Erro: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0]">
      <RoadmapsNavbar />
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-10 mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">My Roadmaps</h1>
        <Button
          size="lg"
          onClick={() => navigate('/create-roadmap')}
          className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white transform transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          New Roadmap
        </Button>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps?.map(({ id, learningGoal, hoursPerDayCommitment }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative bg-[#2A2D3E] p-6 rounded-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex flex-col"
          >
            <Trash2
              className="absolute top-4 right-4 w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => openDeleteModal(id)}
            />
            <Code className="w-8 h-8 text-[#6D4AFF] mb-4" />
            <h3 className="text-xl font-heading font-semibold mb-2">{learningGoal}</h3>
            <p className="text-base text-[#E0E0E0]/80 mb-4 flex-grow">Commitment: {hoursPerDayCommitment}h/day</p>
            <Button
              size="default"
              onClick={() => navigate(`/roadmap/${id}`)}
              className="mt-auto bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              Continue
            </Button>
          </motion.div>
        ))}
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg text-black font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 mb-6">Are you sure you want to delete this roadmap?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
