import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, Check, FileText, BookOpen, Code, CheckSquare, Square } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import confetti from 'canvas-confetti';

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed";
  resources?: RoadmapResource[];
  subtopics?: RoadmapTopic[];
}

export interface RoadmapResource {
  id: string;
  title: string;
  type: "article" | "video" | "course" | "documentation";
  url: string;
  checked?: boolean;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export type RoadmapDataJSON = {
  title: string;
  description: string;
  categories: RoadmapCategory[];
};

export interface RoadmapProps {
  data?: RoadmapDataJSON | string;
  title?: string;
  description?: string;
  categories?: RoadmapCategory[];
  className?: string;
  onToggleContent?: (contentId: string, checked: boolean) => void;
}

const statusColors = {
  "not-started": "bg-[#4A4A5A] text-[#E0E0E0]",
  "in-progress": "bg-[#6D4AFF] text-white",
  "completed": "bg-[#41E988] text-[#1E1E24]"
};

const resourceIcons = {
  "article": <FileText className="h-4 w-4 text-white" />,
  "video": <BookOpen className="h-4 w-4 text-white" />,
  "course": <Code className="h-4 w-4 text-white" />,
  "documentation": <FileText className="h-4 w-4 text-white" />
};

const checkSound = new Audio('/sounds/check.mp3');
const uncheckSound = new Audio('/sounds/uncheck.mp3');

export const RoadmapResourceItem = ({ resource, onToggle }: { resource: RoadmapResource; onToggle?: () => void }) => {
  const isChecked = resource.checked ?? false;

  function handleToggleCheck(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onToggle?.();
    if (!isChecked) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({ particleCount: 60, spread: 70, origin: { x, y } });
      checkSound.currentTime = 0;
      checkSound.play();
    } else {
      uncheckSound.currentTime = 0;
      uncheckSound.play();
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-4 p-4 border border-border rounded-md bg-[#2A2D3E] hover:bg-[#404660] transition-colors">
            {onToggle && (
              <button
                onClick={handleToggleCheck}
                className="p-1 cursor-pointer"
                aria-label={isChecked ? 'Marcar como não concluído' : 'Marcar como concluído'}
              >
                {isChecked ? (
                  <CheckSquare className="h-6 w-6 text-[#41E988]" />
                ) : (
                  <Square className="h-6 w-6 text-black" />
                )}
              </button>
            )}
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 truncate flex-1 ${
                isChecked ? 'line-through text-[#757575]' : 'text-[#E0E0E0]'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {resourceIcons[resource.type]}
              <span className="text-sm">{resource.title}</span>
            </a>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{resource.title}</p>
          <p className="text-xs text-muted-foreground">Click to open</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const RoadmapTopicItem = ({
  topic,
  level = 0,
  onToggleContent,
}: {
  topic: RoadmapTopic;
  level?: number;
  onToggleContent?: (contentId: string, checked: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
  const hasResources = topic.resources && topic.resources.length > 0;

  return (
    <div className="mb-4">
      <Card className="overflow-hidden bg-[#2A2D3E] border border-[rgba(255,255,255,0.1)] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] group transition-colors duration-200 ease-in-out">
        <div
          className={cn(
            "flex items-center justify-between p-4 rounded-t-[12px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D4AFF] transition-colors duration-200",
            hasSubtopics || hasResources ? "hover:bg-gradient-to-br hover:from-[#2A2D3E] hover:to-[#404660]" : ""
          )}
          onClick={() => {
            if (hasSubtopics || hasResources) {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border-2",
              topic.status === "completed" ? "bg-[#41E988] border-[#41E988] text-[#1E1E24]" : "bg-[#4A4A5A] border-[#4A4A5A] text-[#E0E0E0]"
            )}>
              {topic.status === "completed" ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="text-xs font-semibold text-[#E0E0E0]">{level + 1}</span>
              )}
            </div>
            <div>
              <h3 className="font-medium text-[#E0E0E0] group-hover:text-white">{topic.title}</h3>
              <p className="text-sm text-[#E0E0E0]/80 group-hover:text-[#E0E0E0]/90">{topic.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={cn(statusColors[topic.status])}>
              {topic.status === "not-started" ? "Not Started" :
               topic.status === "in-progress" ? "In Progress" : "Completed"}
            </Badge>
            {(hasSubtopics || hasResources) && (
              <ChevronRight
                className={cn(
                  "h-5 w-5 transition-transform text-white",
                  isExpanded ? "rotate-90" : ""
                )}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (hasSubtopics || hasResources) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator />
              <div className="p-4">
                {hasResources && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-[#E0E0E0]">Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {topic.resources?.map(resource => (
                        <RoadmapResourceItem
                          key={resource.id}
                          resource={resource}
                          onToggle={() =>
                            onToggleContent &&
                            onToggleContent(resource.id, !resource.checked)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {hasSubtopics && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Subtopics</h4>
                    <div className="pl-4 border-l-2 border-border space-y-3">
                      {topic.subtopics?.map(subtopic => (
                        <RoadmapTopicItem
                          key={subtopic.id}
                          topic={subtopic}
                          level={level + 1}
                          onToggleContent={onToggleContent}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

const RoadmapCategory = ({
  category,
  onToggleContent,
}: {
  category: RoadmapCategory;
  onToggleContent?: (contentId: string, checked: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <ChevronRight
          className={cn(
            "h-6 w-6 transition-transform text-white",
            isExpanded ? "rotate-90" : ""
          )}
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {category.topics.map((topic, index) => (
              <RoadmapTopicItem
                key={topic.id}
                topic={topic}
                level={index}
                onToggleContent={onToggleContent}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Roadmap({
  data,
  title,
  description,
  categories,
  className,
  onToggleContent,
}: RoadmapProps) {
  // Determine source of data: JSON input or individual props
  const parsedData: RoadmapDataJSON = data
    ? (typeof data === 'string' ? JSON.parse(data) : data)
    : { title: title!, description: description!, categories: categories! };

  const { title: roadmapTitle, description: roadmapDescription, categories: roadmapCategories } = parsedData;

  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTopics = roadmapCategories.reduce((acc, category) => {
      return acc + countAllTopics(category.topics);
    }, 0);

    const completedTopics = roadmapCategories.reduce((acc, category) => {
      return acc + countCompletedTopics(category.topics);
    }, 0);

    setProgress(Math.round(( completedTopics / totalTopics ) * 100) || 0);
  }, [roadmapCategories]);

  const countAllTopics = (topics: RoadmapTopic[]): number => {
    return topics.reduce((acc, topic) => {
      const subtopicsCount = topic.subtopics ? countAllTopics(topic.subtopics) : 0;
      return acc + 1 + subtopicsCount;
    }, 0);
  };

  const countCompletedTopics = (topics: RoadmapTopic[]): number => {
    return topics.reduce((acc, topic) => {
      const subtopicsCount = topic.subtopics ? countCompletedTopics(topic.subtopics) : 0;
      return acc + (topic.status === "completed" ? 1 : 0) + subtopicsCount;
    }, 0);
  };

  return (
    <div ref={containerRef} className={cn("p-6 max-w-5xl mx-auto", className)}>
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

      <div>
        {roadmapCategories.map(category => (
          <RoadmapCategory
            key={category.id}
            category={category}
            onToggleContent={onToggleContent}
          />
        ))}
      </div>
    </div>
  );
}
