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

### [GET] /api/roadmaps/:roadmap_id

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

### [GET] /api/roadmaps/:roadmap_id/topics/:topic_id

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

### [GET] /api/roadmaps/:roadmap_id/quiz

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

### [POST] /api/roadmaps/:roadmap_id/quiz/answers

> submit user's answers for a specific roadmap quiz

```json
// body received
{
	"answers": [
		{
			"roadmapQuizQuestionsId": "123456789828345678901234567890123452232",
			"roadmapQuizQuestionsAnswerId": "442245678982834567890030396789012345223"
		},
		{
			"roadmapQuizQuestionsId": "123456789828345678901234567890123452233",
			"roadmapQuizQuestionsAnswerId": "442245678982834567890030396789012345227"
		}
	]
}
```

### [GET] /api/roadmaps/:roadmap_id/quiz/score

> get user score related to a specific roadmap quiz

```json
{
	"data": {
		"totalQuestions": 2,
		"totalCorrect": 2,
		"scorePercentage": 100,
		"correctAnswers": [
			{
				"questionId": "123456789828345678901234567890123452232",
				"answerId": "442245678982834567890030396789012345223",
				"question": "What is the main purpose of blockchain?",
				"answer": "Decentralized ledger technology"
			}
		],
		"wrongAnswers": [
			{
				"questionId": "123456789828345678901234567890123452233",
				"answerId": "442245678982834567890030396789012345227",
				"question": "What is the main advantage of blockchain?",
				"answer": "Fast transaction speed"
			}
		]
	},
	"error": null
}
```

### [PATCH] /api/roadmaps/:roadmap_id/contents/:content_id

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
fetch("http://localhost:3000/api/roadmaps/:roadmap_id", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

4. user clicks on a specific topic in their roadmap:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmap_id/topics/:topic_id", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

5. user marks a content as completed:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmap_id/contents/:content_id", {
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
fetch("http://localhost:3000/api/roadmaps/:roadmap_id/quiz", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```

7. user submits their quiz answers:

```ts
fetch("http://localhost:3000/api/roadmaps/:roadmap_id/quiz/answers", {
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
fetch("http://localhost:3000/api/roadmaps/:roadmap_id/quiz/score", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer {{ JWT_TOKEN }}",
	},
});
```
