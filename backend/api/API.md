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
			"learning_goal": "test",
			"knowledge_level": "beginner",
			"hours_per_day_commitment": 1,
			"learning_style": "visual"
		},
		{
			"id": "1234567890123456789012345678901234567890",
			"theme": "test",
			"learning_goal": "test",
			"knowledge_level": "expert",
			"hours_per_day_commitment": 1,
			"learning_style": "auditory"
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
		"learning_goal": "test",
		"knowledge_level": "expert",
		"hours_per_day_commitment": 1,
		"learning_style": "auditory",
		"topics": [
			{
				"id": "1234567890123456789012345678901234567890",
				"topic_name": "Introduction to Blockchain",
				"topic_description": "Basic concepts and fundamentals of blockchain technology",
				"topic_index": 1
			},
			{
				"id": "2234567890123456789012345678901234567890",
				"topic_name": "Smart Contracts",
				"topic_description": "Understanding smart contracts and their implementation",
				"topic_index": 2
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
		"roadmap_name": "test",
		"roadmap_id": "1234567890123456789012345678901234567890",
		"topic_id": "1234567890123456789012345678901234567890",
		"topic_name": "Introduction to Blockchain",
		"contents": [
			{
				"id": "1234567890123456789012345678901234567890",
				"name": "Introduction to Blockchain",
				"description": "Basic concepts and fundamentals of blockchain technology",
				"content_type": "VIDEO",
				"url": "https://example.com/blockchain-intro",
				"checked": false
			},
			{
				"id": "1234567890123456789012345678901234567890",
				"name": "Introduction to Blockchain",
				"description": "Basic concepts and fundamentals of blockchain technology",
				"content_type": "VIDEO",
				"url": "https://example.com/blockchain-intro",
				"checked": false
			}
		]
	},
	"error": null
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
