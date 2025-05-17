## The response type for all endpoints will be:

```ts
type Response<T> = {
  "data": null | <T>,
  "error": null | { "message": string, "status": number }
}
```

## Auth

### [POST] /api/auth/signup

```json
// body received
{
	"email": "test@test.com",
	"password": "test",
	"name": "test",
	"wallet_address": "" // optional
}
```

### [POST] /api/auth/signin

```json
// body received
{
	"email": "test@test.com",
	"password": "test"
}
```

## Roadmap (all endpoints are protected)

### [POST] /api/roadmaps

> receive some user options and create a entire roadmap with AI

```json
// body received
{
	"theme": "test",
	"learning_goal": "test",
	"knowledge_level": "beginner",
	"hours_per_day_commitment": 1,
	"learning_style": "visual"
}
```

### [GET] /api/roadmaps

> returns all user's roadmaps, based on the userId extracted from the JWT token

```json
{
	"data": [
		{
			"id": "1234567890123456789012345678901234567890",
			"theme": "test",
			"learningGoal": "test",
			"knowledgeLevel": "beginner",
			"hoursPerDayCommitment": 1,
			"learningStyle": "visual"
		},
		{
			"id": "1234567890123456789012345678901234567890",
			"theme": "test",
			"learningGoal": "test",
			"knowledgeLevel": "expert",
			"hoursPerDayCommitment": 1,
			"learningStyle": "auditory"
		}
	],
	"error": null
}
```

### [GET] /api/roadmaps/:roadmapId

> returns one specific roadmap, including an array of topics (will be able to mount the roadmap nodes, for example)

```json
{
	"data": {
		"id": "1234567890123456789012345678901234567890",
		"theme": "test",
		"learningGoal": "test",
		"knowledgeLevel": "expert",
		"hoursPerDayCommitment": 1,
		"learningStyle": "auditory",
		"roadmapTopics": [
			{
				"id": "1234567890123456789012345678901234567890",
				"topicName": "Introduction to Blockchain",
				"topicDescription": "Basic concepts and fundamentals of blockchain technology",
				"topicIndex": 1
			},
			{
				"id": "2234567890123456789012345678901234567890",
				"topicName": "Smart Contracts",
				"topicDescription": "Understanding smart contracts and their implementation",
				"topicIndex": 2
			}
		]
	},
	"error": null
}
```

### [GET] /api/roadmaps/:roadmapId/topics/:topicId

> returns all informations/contents of one specific roadmap topic

```json
{
	"data": {
		"roadmapName": "Fullstack Web Development",
		"roadmapId": "48684d41-c0b8-4aea-9eec-d9caf14678c2",
		"topicId": "d22602fe-2fd1-4a3d-917a-6e7f7c7db85b",
		"topicName": "HTML & CSS Fundamentals",
		"topicDescription": "Learn the building blocks of web development",
		"contents": [
			{
				"id": "6c049164-3d83-4b01-b925-226fe9135bec",
				"name": "HTML Crash Course",
				"description": "Learn HTML basics in 1 hour",
				"contentType": "VIDEO",
				"url": "https://www.youtube.com/watch?v=UB1O30fR-EE",
				"checked": false
			},
			{
				"id": "6d7b9485-d823-4fba-8fe1-9731dfccf56f",
				"name": "CSS Documentation",
				"description": "Official MDN CSS documentation",
				"contentType": "TEXT",
				"url": "https://developer.mozilla.org/en-US/docs/Web/CSS",
				"checked": false
			}
		]
	},
	"error": null
}
```

### [GET] /api/roadmaps/:roadmapId/quiz

> returns quiz questions and answers for a specific roadmap

```json
{
	"data": [
		{
			"id": "123456789828345678901234567890123452232",
			"roadmapId": "1234567890123456789012345678901234567890",
			"text": "What is the main purpose of blockchain technology?",
			"answers": [
				{
					"id": "442245678982834567890030396789012345223",
					"text": "Decentralization and secure record-keeping"
				},
				{
					"id": "442245678982834567890030396789012345224",
					"text": "To create digital currencies only"
				},
				{
					"id": "442245678982834567890030396789012345225",
					"text": "For entertainment purposes"
				},
				{
					"id": "442245678982834567890030396789012345226",
					"text": "To replace traditional databases completely"
				}
			]
		},
		{
			"id": "123456789828345678901234567890123452233",
			"roadmapId": "1234567890123456789012345678901234567890",
			"text": "Which of the following is NOT a key characteristic of blockchain technology?",
			"answers": [
				{
					"id": "442245678982834567890030396789012345227",
					"text": "Centralized control by a single authority"
				},
				{
					"id": "442245678982834567890030396789012345228",
					"text": "Immutability of records"
				},
				{
					"id": "442245678982834567890030396789012345229",
					"text": "Transparency of transactions"
				},
				{
					"id": "442245678982834567890030396789012345230",
					"text": "Cryptographic security"
				}
			]
		}
	],
	"error": null
}
```

### [POST] /api/roadmaps/:roadmapId/quiz/answers

> submit user's answers for a specific roadmap quiz

```json
// body received
// the number of answers should be equal the number of quiz questions
{
	"answers": [
		{
			"questionId": "123456789828345678901234567890123452232",
			"answerId": "442245678982834567890030396789012345223"
		},
		{
			"questionId": "123456789828345678901234567890123452233",
			"answerId": "442245678982834567890030396789012345227"
		}
	]
}
```

### [GET] /api/roadmaps/:roadmapId/quiz/score

> get user score related to a specific roadmap quiz

```json
{
	"data": {
		"totalQuestions": 5,
		"totalCorrect": 3,
		"totalWrong": 2,
		"scorePercentage": 60,
		"correctAnswers": [
			{
				"questionId": "572f33f1-ec52-48f8-ba47-051aba9b4413",
				"answerId": "8a648f5a-7ad1-43db-a9d9-0d96fb69c538",
				"question": "What is the correct HTML element for the largest heading?",
				"answer": "<h1>"
			},
			{
				"questionId": "b52a078c-4d6a-483f-8baf-92418be6391a",
				"answerId": "7324647e-0392-4f4f-b9dc-83a2a104766d",
				"question": "Which of the following is not a JavaScript data type?",
				"answer": "Character"
			},
			{
				"questionId": "2f82f626-0e12-45d5-b75d-40b429511dc2",
				"answerId": "b3ef1159-75a4-429d-a5c3-006dc1148288",
				"question": "What is the correct way to declare a variable in JavaScript?",
				"answer": "let x = 5;"
			}
		],
		"wrongAnswers": [
			{
				"questionId": "86c0f131-a2ba-4276-a533-f7003ca2ea3b",
				"answerId": "535e8a16-a23e-41a7-95ac-7e6bf244626a",
				"question": "Which CSS property is used to change the text color of an element?",
				"answer": "text-color"
			},
			{
				"questionId": "c58a4f02-9b10-4406-89ef-9f33f7db9321",
				"answerId": "6bd9e264-83aa-4030-9a60-274714dc38da",
				"question": "What is a React Hook?",
				"answer": "A way to connect to external APIs"
			}
		]
	},
	"error": null
}
```

### [PATCH] /api/roadmaps/:roadmapId/contents/:contentId

> marks a specific content as completed/checked or not

```json
// body received
{
	"checked": true
}
```

## Example flow:

1. user logs into the application:

```ts
fetch("http://localhost:3000/api/auth/signin", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		body: JSON.stringify({
			email: "email...",
			password: "123456",
		}),
	},
});
```

2. user fetches all their created roadmaps:

```ts
fetch("http://localhost:3000/api/roadmaps", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

3. user clicks on one of their roadmaps:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

4. user clicks on a specific topic in their roadmap:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId/topics/:topicId", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

5. user marks a content as completed:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId/contents/:contentId", {
	method: "PATCH",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
	body: JSON.stringify({
		checked: true,
	}),
});
```

6. user opens the quiz for a specific roadmap:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId/quiz", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

7. user submits their quiz answers:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId/quiz/answers", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
	body: JSON.stringify({
		answers: [
			{
				roadmap_quiz_questions_id: "123456789828345678901234567890123452232",
				roadmap_quiz_questions_answer_id:
					"442245678982834567890030396789012345223",
			},
			{
				roadmap_quiz_questions_id: "123456789828345678901234567890123452233",
				roadmap_quiz_questions_answer_id:
					"442245678982834567890030396789012345227",
			},
		],
	}),
});
```

8. user checks their quiz results:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmapId/quiz/score", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```
