"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, X } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Início' },
    position: { x: 250, y: 25 },
    className: 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24] text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2',
  },
  {
    id: '2',
    data: { label: 'Conceitos Básicos' },
    position: { x: 100, y: 125 },
    className: 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24] text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2',
  },
  {
    id: '3',
    data: { label: 'Instalação' },
    position: { x: 400, y: 125 },
    className: 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24] text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2',
  },
  {
    id: '4',
    data: { label: 'Hands-on' },
    position: { x: 250, y: 225 },
    className: 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24] text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2',
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Conclusão' },
    position: { x: 250, y: 325 },
    className: 'bg-gradient-to-br from-[#2A2D3E] to-[#1E1E24] text-white border border-[#4A4A5A] rounded-xl shadow-2xl px-4 py-2',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6D4AFF' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#6D4AFF' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#6D4AFF' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#6D4AFF' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#6D4AFF' } },
];

export function RoadmapDetailPage() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const navigate = useNavigate();

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
        <div className="bg-[#2A2D3E] rounded-lg p-4 h-[80vh]">
          <ReactFlowProvider>
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
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
        </div>
      </div>

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
              className="fixed top-0 right-0 h-full w-80 bg-[#2A2D3E] z-30 p-4 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold">
                  {String(selectedNode.data.label)}
                </h2>
                <Button variant="ghost" className="p-1" onClick={() => setSelectedNode(null)}>
                  <X className="w-5 h-5 text-[#E0E0E0]" />
                </Button>
              </div>

              <p className="text-sm text-[#E0E0E0]/80 mb-6">
                Descrição detalhada do tópico "{String(selectedNode.data.label)}". Aqui você pode ver
                recursos, links e informações adicionais para guiar seu estudo.
              </p>

              <Button
                size="default"
                className="mt-auto bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white"
              >
                Marcar como concluído
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}