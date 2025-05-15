import {
  KnowledgeLevel,
  LearningStyle,
  PrismaClient,
  TopicContentType,
} from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.roadmapTopicContent.deleteMany();
  await prismaClient.roadmapQuizAnswer.deleteMany();
  await prismaClient.roadmapQuizUserAnswer.deleteMany();
  await prismaClient.roadmapQuizQuestions.deleteMany();
  await prismaClient.roadmapTopic.deleteMany();
  await prismaClient.roadmap.deleteMany();
  await prismaClient.user.deleteMany();

  const user = await prismaClient.user.create({
    data: {
      email: "developer@example.com",
      name: "John Developer",
      passwordHash: "hashed_password_here",
    },
  });

  await prismaClient.roadmap.create({
    data: {
      userId: user.id,
      theme: "Fullstack Web Development",
      learningGoal:
        "Become a proficient fullstack developer capable of building modern web applications",
      knowledgeLevel: KnowledgeLevel.BEGINNER,
      hoursPerDayCommitment: 2,
      learningStyle: LearningStyle.VISUAL,
      roadmapTopics: {
        create: [
          {
            topicName: "HTML & CSS Fundamentals",
            topicDescription: "Learn the building blocks of web development",
            topicIndex: 1,
            roadmapTopicContents: {
              create: [
                {
                  name: "HTML Crash Course",
                  description: "Learn HTML basics in 1 hour",
                  contentType: TopicContentType.VIDEO,
                  url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                },
                {
                  name: "CSS Documentation",
                  description: "Official MDN CSS documentation",
                  contentType: TopicContentType.TEXT,
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
                },
              ],
            },
          },
          {
            topicName: "JavaScript Essentials",
            topicDescription: "Master JavaScript programming language",
            topicIndex: 2,
            roadmapTopicContents: {
              create: [
                {
                  name: "JavaScript Full Course",
                  description: "Complete JavaScript course for beginners",
                  contentType: TopicContentType.VIDEO,
                  url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
                },
                {
                  name: "JavaScript.info",
                  description: "Modern JavaScript tutorial",
                  contentType: TopicContentType.TEXT,
                  url: "https://javascript.info/",
                },
              ],
            },
          },
          {
            topicName: "React.js Framework",
            topicDescription: "Learn the most popular frontend framework",
            topicIndex: 3,
            roadmapTopicContents: {
              create: [
                {
                  name: "React Documentation",
                  description: "Official React documentation",
                  contentType: TopicContentType.TEXT,
                  url: "https://react.dev/",
                },
                {
                  name: "React Crash Course",
                  description: "Learn React in 1 hour",
                  contentType: TopicContentType.VIDEO,
                  url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
                },
              ],
            },
          },
          {
            topicName: "Node.js & Express",
            topicDescription: "Backend development with Node.js",
            topicIndex: 4,
            roadmapTopicContents: {
              create: [
                {
                  name: "Node.js Documentation",
                  description: "Official Node.js documentation",
                  contentType: TopicContentType.TEXT,
                  url: "https://nodejs.org/en/docs/",
                },
                {
                  name: "Express.js Crash Course",
                  description: "Learn Express.js in 1 hour",
                  contentType: TopicContentType.VIDEO,
                  url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
                },
              ],
            },
          },
          {
            topicName: "Database Fundamentals",
            topicDescription: "Learn about databases and data modeling",
            topicIndex: 5,
            roadmapTopicContents: {
              create: [
                {
                  name: "PostgreSQL Tutorial",
                  description: "Learn PostgreSQL from scratch",
                  contentType: TopicContentType.VIDEO,
                  url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
                },
                {
                  name: "Prisma Documentation",
                  description: "Official Prisma documentation",
                  contentType: TopicContentType.TEXT,
                  url: "https://www.prisma.io/docs/",
                },
              ],
            },
          },
        ],
      },
      RoadmapQuizQuestions: {
        create: [
          {
            text: "What is the correct HTML element for the largest heading?",
            RoadmapQuizAnswer: {
              create: [
                { text: "<h1>", is_correct: true },
                { text: "<heading>", is_correct: false },
                { text: "<head>", is_correct: false },
                { text: "<h6>", is_correct: false },
              ],
            },
          },
          {
            text: "Which CSS property is used to change the text color of an element?",
            RoadmapQuizAnswer: {
              create: [
                { text: "color", is_correct: true },
                { text: "text-color", is_correct: false },
                { text: "font-color", is_correct: false },
                { text: "text-style", is_correct: false },
              ],
            },
          },
          {
            text: "Which of the following is not a JavaScript data type?",
            RoadmapQuizAnswer: {
              create: [
                { text: "Character", is_correct: true },
                { text: "String", is_correct: false },
                { text: "Boolean", is_correct: false },
                { text: "Number", is_correct: false },
              ],
            },
          },
          {
            text: "What is the correct way to declare a variable in JavaScript?",
            RoadmapQuizAnswer: {
              create: [
                { text: "let x = 5;", is_correct: true },
                { text: "variable x = 5;", is_correct: false },
                { text: "v x = 5;", is_correct: false },
                { text: "x = 5;", is_correct: false },
              ],
            },
          },
          {
            text: "What is a React Hook?",
            RoadmapQuizAnswer: {
              create: [
                {
                  text: "A function that lets you use state and other React features in functional components",
                  is_correct: true,
                },
                {
                  text: "A way to connect to external APIs",
                  is_correct: false,
                },
                {
                  text: "A method to create class components",
                  is_correct: false,
                },
                {
                  text: "A tool for debugging React applications",
                  is_correct: false,
                },
              ],
            },
          },
          {
            text: "Which hook is used to manage side effects in React?",
            RoadmapQuizAnswer: {
              create: [
                { text: "useEffect", is_correct: true },
                { text: "useState", is_correct: false },
                { text: "useContext", is_correct: false },
                { text: "useReducer", is_correct: false },
              ],
            },
          },
          {
            text: "What is the purpose of the package.json file in a Node.js project?",
            RoadmapQuizAnswer: {
              create: [
                {
                  text: "To manage project dependencies and scripts",
                  is_correct: true,
                },
                { text: "To store database credentials", is_correct: false },
                { text: "To configure the web server", is_correct: false },
                { text: "To define HTML templates", is_correct: false },
              ],
            },
          },
          {
            text: "Which method is used to create a new route in Express.js?",
            RoadmapQuizAnswer: {
              create: [
                { text: "app.get()", is_correct: true },
                { text: "app.route()", is_correct: false },
                { text: "app.createRoute()", is_correct: false },
                { text: "app.newRoute()", is_correct: false },
              ],
            },
          },
          {
            text: "What is a primary key in a database?",
            RoadmapQuizAnswer: {
              create: [
                {
                  text: "A unique identifier for each record in a table",
                  is_correct: true,
                },
                { text: "A foreign key reference", is_correct: false },
                { text: "A backup of the database", is_correct: false },
                { text: "A type of database index", is_correct: false },
              ],
            },
          },
          {
            text: "What is the purpose of Prisma in a Node.js application?",
            RoadmapQuizAnswer: {
              create: [
                {
                  text: "To provide a type-safe database ORM",
                  is_correct: true,
                },
                { text: "To handle HTTP requests", is_correct: false },
                { text: "To manage frontend state", is_correct: false },
                { text: "To create database backups", is_correct: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
