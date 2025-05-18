"use client";

import { useState, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import { ReactFlow, ReactFlowProvider, Controls, Background, type Node, type Edge, MarkerType } from '@xyflow/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Check, Loader2 } from 'lucide-react';
import type { RoadmapProps, RoadmapTopic, RoadmapDataJSON } from './Roadmap';
import { Card } from '@/components/ui/card';
import { RoadmapResourceItem } from './Roadmap';

export function RoadmapFlow({ data, title, description, categories, onToggleContent }: RoadmapProps) {
  const parsedData: RoadmapDataJSON = data
    ? (typeof data === 'string' ? JSON.parse(data) : data)
    : { title: title!, description: description!, categories: categories! };
  const { title: roadmapTitle, description: roadmapDescription, categories: roadmapCategories } = parsedData;

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [progress, setProgress] = useState(0);

  const countAllTopics = (topics: RoadmapTopic[]): number =>
    topics.reduce((acc, topic) => acc + 1 + (topic.subtopics ? countAllTopics(topic.subtopics) : 0), 0);

  const countCompletedTopics = (topics: RoadmapTopic[]): number =>
    topics.reduce(
      (acc, topic) => acc + (topic.status === 'completed' ? 1 : 0) + (topic.subtopics ? countCompletedTopics(topic.subtopics) : 0),
      0
    );

  useEffect(() => {
    const total = roadmapCategories.reduce((acc, cat) => acc + countAllTopics(cat.topics), 0);
    const completed = roadmapCategories.reduce((acc, cat) => acc + countCompletedTopics(cat.topics), 0);
    setProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
  }, [roadmapCategories]);

  const allTopics = roadmapCategories.flatMap(cat => cat.topics);
  const verticalSpacing = 150;
  const nodes: Node[] = allTopics.map((topic, idx) => {
    const isCompleted = topic.status === 'completed';
    const isInProgress = topic.status === 'in-progress';
    const bgClass = isCompleted
      ? 'bg-gradient-to-br from-[#41E988] to-[#1E1E24]'
      : isInProgress
      ? 'bg-gradient-to-br from-[#6D4AFF] to-[#8C6DFF]'
      : 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24]';
    return {
      id: topic.id,
      data: {
        label: (
          <div className="flex items-center gap-2">
            <span className="flex-1 truncate">{topic.title}</span>
            {isCompleted && <Check className="w-4 h-4 text-[#1E1E24]" />}
            {!isCompleted && isInProgress && (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            )}
          </div>
        ),
      },
      position: { x: 200, y: idx * verticalSpacing + 50 },
      className: `${bgClass} text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2`,
    };
  });

  const edges: Edge[] = allTopics.slice(0, -1).map((topic, idx) => {
    const next = allTopics[idx + 1];
    return {
      id: `e-${topic.id}-${next.id}`,
      source: topic.id,
      target: next.id,
      markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: '#6D4AFF' },
      style: { stroke: '#6D4AFF', strokeWidth: 2 },
    };
  });

  const selectedTopic = selectedNode ? allTopics.find(t => t.id === selectedNode.id) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-5xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h1 className="text-[32px] font-bold mb-2 font-poppins text-[#E0E0E0]">{roadmapTitle}</h1>
        <p className="text-[16px] text-[#E0E0E0]/80 mb-6 font-inter">{roadmapDescription}</p>

        <div className="w-full max-w-md mx-auto bg-[#2A2D3E] rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%`, backgroundColor: '#41E988' }}
          />
        </div>
        <p className="text-[14px] text-[#E0E0E0]/80">
          <span className="font-medium text-[#E0E0E0]">{progress}%</span> completed
        </p>
      </div>
      <div className="bg-[#2A2D3E] rounded-lg p-4 h-[80vh]">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            defaultViewport={{ x: 0, y: 0, zoom: 1.1 }}
            onNodeClick={(_, node) => setSelectedNode(node as Node)}
            className="rounded-lg"
          >
            <Controls showInteractive={false} />
            <Background gap={12} size={1} color="#4A4A5A" />
          </ReactFlow>
        </ReactFlowProvider>
        <AnimatePresence>
          {selectedNode && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-20"
                onClick={() => setSelectedNode(null)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 z-30"
              >
                <Card className="flex flex-col h-full p-4 bg-[#2A2D3E] border border-[rgba(255,255,255,0.1)] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-semibold text-white">
                      {selectedTopic?.title ?? String(selectedNode.data.label)}
                    </h2>
                    <Button variant="ghost" className="p-1 cursor-pointer" onClick={() => setSelectedNode(null)}>
                      <X className="w-5 h-5 text-black" />
                    </Button>
                  </div>
                  <p className="text-sm text-[#E0E0E0]/80 mb-4">
                    {selectedTopic?.description}
                  </p>
                  {selectedTopic?.resources && selectedTopic.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-2 text-[#E0E0E0]">Resources</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedTopic.resources.map(resource => (
                          <RoadmapResourceItem
                            key={resource.id}
                            resource={resource}
                            onToggle={() =>
                              onToggleContent && onToggleContent(resource.id, !resource.checked)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
