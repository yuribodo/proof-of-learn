import { Roadmap } from "@/components/roadmap/Roadmap";

const exampleCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Aprenda os fundamentos do desenvolvimento frontend",
    topics: [
      {
        id: "html",
        title: "HTML",
        description: "Estrutura das páginas web",
        status: "completed" as const,
        resources: [
          { id: "html-mdn", title: "MDN HTML Guide", type: "documentation" as const, url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
          { id: "html-course", title: "Tutorial de HTML", type: "video" as const, url: "https://www.youtube.com/watch?v=UB1O30fR-EE" },
        ],
        subtopics: [],
      },
      {
        id: "css",
        title: "CSS",
        description: "Estilização de páginas",
        status: "in-progress" as const,
        resources: [
          { id: "css-mdn", title: "MDN CSS Guide", type: "documentation" as const, url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
        ],
        subtopics: [],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Programação no lado do servidor",
    topics: [
      {
        id: "nodejs",
        title: "Node.js",
        description: "Ambiente de execução JavaScript",
        status: "not-started" as const,
        resources: [],
        subtopics: [],
      },
    ],
  },
];

export default function RoadmapDemoPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
      <Roadmap
        title="Web Development Roadmap"
        description="Demo de roadmap com dados mockados"
        categories={exampleCategories}
      />
    </div>
  );
}
