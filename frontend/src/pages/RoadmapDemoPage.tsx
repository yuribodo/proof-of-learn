"use client";
import { useState } from 'react';
import { Roadmap } from "@/components/roadmap/Roadmap";
import { RoadmapFlow } from "@/components/roadmap/RoadmapFlow";

// Mock data adapted from Prisma seed
const exampleCategories = [
  {
    id: "demo",
    title: "Become a proficient fullstack developer capable of building modern web applications",
    description: "Compromisso: 2h/dia",
    topics: [
      {
        id: "html-css-fundamentals",
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web development",
        status: "not-started" as const,
        resources: [
          {
            id: "html-crash-course",
            title: "HTML Crash Course",
            type: "video" as const,
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          },
          {
            id: "css-documentation",
            title: "CSS Documentation",
            type: "documentation" as const,
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
        ],
        subtopics: [],
      },
      {
        id: "javascript-essentials",
        title: "JavaScript Essentials",
        description: "Master JavaScript programming language",
        status: "not-started" as const,
        resources: [
          {
            id: "js-full-course",
            title: "JavaScript Full Course",
            type: "video" as const,
            url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
          },
          {
            id: "javascript-info",
            title: "JavaScript.info",
            type: "documentation" as const,
            url: "https://javascript.info/",
          },
        ],
        subtopics: [],
      },
      {
        id: "react-js-framework",
        title: "React.js Framework",
        description: "Learn the most popular frontend framework",
        status: "not-started" as const,
        resources: [
          {
            id: "react-docs",
            title: "React Documentation",
            type: "documentation" as const,
            url: "https://react.dev/",
          },
          {
            id: "react-crash-course",
            title: "React Crash Course",
            type: "video" as const,
            url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
          },
        ],
        subtopics: [],
      },
      {
        id: "node-js-express",
        title: "Node.js & Express",
        description: "Backend development with Node.js",
        status: "not-started" as const,
        resources: [
          {
            id: "node-js-docs",
            title: "Node.js Documentation",
            type: "documentation" as const,
            url: "https://nodejs.org/en/docs/",
          },
          {
            id: "express-crash-course",
            title: "Express.js Crash Course",
            type: "video" as const,
            url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
          },
        ],
        subtopics: [],
      },
      {
        id: "database-fundamentals",
        title: "Database Fundamentals",
        description: "Learn about databases and data modeling",
        status: "not-started" as const,
        resources: [
          {
            id: "postgresql-tutorial",
            title: "PostgreSQL Tutorial",
            type: "video" as const,
            url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
          },
          {
            id: "prisma-docs",
            title: "Prisma Documentation",
            type: "documentation" as const,
            url: "https://www.prisma.io/docs/",
          },
        ],
        subtopics: [],
      },
    ],
  },
];

export default function RoadmapDemoPage() {
  const [showFlow, setShowFlow] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6">
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
            title="Become a proficient fullstack developer capable of building modern web applications"
            description="Compromisso: 2h/dia"
            categories={exampleCategories}
          />
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-heading font-semibold mb-4">
              Roadmap Flow Demo
            </h2>
            <RoadmapFlow
              title="Become a proficient fullstack developer capable of building modern web applications"
              description="Compromisso: 2h/dia"
              categories={exampleCategories}
            />
          </div>
        )}
      </div>
    </div>
  );
}
