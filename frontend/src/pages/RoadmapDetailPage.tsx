"use client";

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Roadmap } from '@/components/roadmap/Roadmap';
import { RoadmapFlow } from '@/components/roadmap/RoadmapFlow';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
  const [showCurrent, setShowCurrent] = useState(true);
  const { data: roadmapData, isLoading, isError, error } = useQuery<RoadmapDataAPI>({
    queryKey: ['roadmap', id!],
    queryFn: async (): Promise<RoadmapDataAPI> => {
      const res = await api.get<{ data: RoadmapDataAPI }>(`/roadmaps/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Carregando roadmap...</div>;
  if (isError) return <div>Erro: {(error as Error).message}</div>;

  const { learningGoal, hoursPerDayCommitment, roadmapTopics } = roadmapData!;
  const categories = [
    {
      id: id!,
      title: learningGoal,
      description: `Compromisso: ${hoursPerDayCommitment}h/dia`,
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
        })),
        subtopics: [],
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0]">
      <header className="flex items-center justify-between px-8 py-4 bg-[#1E1E24] shadow-md">
        <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-[#E0E0E0]" />
        </Button>
        <h1 className="text-2xl font-heading font-semibold">Meu Roadmap</h1>
        <div className="w-6" />
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm">Anterior</span>
          <Switch
            id="view-toggle"
            checked={showCurrent}
            onCheckedChange={setShowCurrent}
            className="mx-2"
            aria-label="Toggle view"
          />
          <span className="text-sm">Atual</span>
        </div>
        {showCurrent ? (
          <Roadmap title={learningGoal} description="" categories={categories} />
        ) : (
          <RoadmapFlow
            title={learningGoal}
            description={`Compromisso: ${hoursPerDayCommitment}h/dia`}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
