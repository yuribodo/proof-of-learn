import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roadmapService } from '@/services/roadmapService';
import { Roadmap } from '@/components/roadmap/Roadmap';
import { RoadmapFlow } from '@/components/roadmap/RoadmapFlow';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface TopicContentAPI {
  id: string;
  name: string;
  description: string;
  contentType: 'TEXT' | 'VIDEO';
  url: string;
  checked: boolean;
}

interface TopicAPI {
  id: string;
  topicName: string;
  topicDescription: string;
  roadmapTopicContents: TopicContentAPI[];
}

interface RoadmapDataAPI {
  id: string;
  learningGoal: string;
  hoursPerDayCommitment: number;
  roadmapTopics: TopicAPI[];
}

export function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showFlow, setShowFlow] = useState(false);
  const queryClient = useQueryClient();
  const updateContentMutation = useMutation({
    mutationFn: (vars: { contentId: string; checked: boolean }) =>
      roadmapService.updateContentChecked(id!, vars.contentId, vars.checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap', id!] });
    },
  });
  const { data: roadmapData, isLoading, isError, error } = useQuery<RoadmapDataAPI>({
    queryKey: ['roadmap', id!],
    queryFn: () => roadmapService.getRoadmapById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 animate-pulse">
        <nav aria-label="Main navigation" className="flex items-center justify-between bg-[#1E1E24] px-6 py-4 shadow-md mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-600 rounded" />
            <div className="h-6 w-1/3 bg-gray-600 rounded" />
          </div>
          <div className="h-8 w-20 bg-gray-600 rounded" />
        </nav>
        <div className="container mx-auto space-y-6">
          <div className="h-8 w-1/2 bg-gray-600 rounded mb-4" />
          <div className="h-4 w-full bg-gray-600 rounded mb-2" />
          <div className="h-4 w-3/4 bg-gray-600 rounded mb-2" />
          <div className="h-48 bg-gray-600 rounded" />
        </div>
      </div>
    );
  }
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const { learningGoal, hoursPerDayCommitment, roadmapTopics } = roadmapData!;
  const categories = [
    {
      id: id!,
      title: learningGoal,
      description: `Commitment: ${hoursPerDayCommitment}h/day`,
      topics: roadmapTopics.map((topic: TopicAPI) => ({
        id: topic.id,
        title: topic.topicName,
        description: topic.topicDescription,
        status: (
          topic.roadmapTopicContents.every(c => c.checked)
            ? 'completed'
            : topic.roadmapTopicContents.some(c => c.checked)
            ? 'in-progress'
            : 'not-started'
        ) as 'completed' | 'in-progress' | 'not-started',
        resources: topic.roadmapTopicContents.map((content: TopicContentAPI) => ({
          id: content.id,
          title: content.name,
          type: content.contentType.toLowerCase() as 'article' | 'video' | 'course' | 'documentation',
          url: content.url,
          checked: content.checked,
        })),
        subtopics: [],
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
      <nav aria-label="Main navigation" className="flex items-center justify-between bg-[#1E1E24] px-6 py-4 shadow-md mb-6">
        <div className="flex items-center space-x-4">
          <Button  className="p-2 cursor-pointer" onClick={() => navigate('/roadmaps')}>
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
          <h1 className="text-2xl font-heading font-bold text-[#E0E0E0]">My Roadmap</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="default"
            className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(`/roadmap/${id}/quiz`)}
          >
            Take Quiz
          </Button>
        </div>
      </nav>
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm">Static</span>
          <input
            id="view-toggle"
            type="checkbox"
            checked={showFlow}
            onChange={e => setShowFlow(e.target.checked)}
            className="h-5 w-10 rounded-full bg-gray-600 appearance-none cursor-pointer relative after:block after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all checked:bg-indigo-500 checked:after:translate-x-5"
          />
          <span className="text-sm">Flow</span>
        </div>
        {!showFlow ? (
          <Roadmap
            title={learningGoal}
            description={`Commitment: ${hoursPerDayCommitment}h/day`}
            categories={categories}
            onToggleContent={(contentId: string, checked: boolean) => {
              updateContentMutation.mutate({ contentId, checked }, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['roadmap', id!] });
                }
              });
            }}
          />
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-heading font-semibold mb-4">Roadmap Flow</h2>
            <RoadmapFlow
              title={learningGoal}
              description={`Commitment: ${hoursPerDayCommitment}h/day`}
              categories={categories}
              onToggleContent={(contentId: string, checked: boolean) => {
                updateContentMutation.mutate({ contentId, checked }, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['roadmap', id!] });
                  }
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
