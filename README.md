# Server Core External

A subset of API for use with Mobile.

You will need an Auth0 id_token. You can generate one by:

1. Go to https://dashboard.dev.clarityhub.io
2. Login
3. Open the Dev Tools
4. Open Network Tab
5. Look for the following request: https://clarityhub.auth0.com/oauth/token
6. You will get the id_token from the response.

Run the server:

```sh
npm i
npm i -g serverless
serverless dynamodb install
SLS_DEBUG=* serverless offline start --host=0.0.0.0 --stage local
```

To test the API, you can do the following in Postman:

1. URL: http://0.0.0.0:4000/interviews
2. Method: Get
3. Headers, add Authorization Bearer Token. Set the token to the ID Token from above.

## API Endpoints

### Authorization

Use the `Authorization` header with a `Bearer token`.

The `Bearer token` value should be the `id_token` you received when
logging in via Auth0.

When hitting production, you will need an API Key. Add this to your header as `x-api-key` and the API Key set as the value. Ask your admin for a key.

### GET /interviews

Get a list of interviews.

**Authorization**: [See authorization](#authorization)

#### Responses

Empty Response:

```json
{
  "tagItems": [],
  "items": []
}
```

Single response:

```json
{
    "tagItems": [
        []
    ],
    "items": [
        {
            "workspaceId": "idmontie@gmail.com",
            "id": "694f9a2b-fbe0-4452-a3b7-558e7b1d0939",
            "updatedAt": "2019-10-29T02:43:16.965Z",
            "content": "[]",
            "title": "My title",
            "createdAt": "2019-10-29T02:43:16.964Z"
        }
    ]
}
```

### POST /interviews

Create an interview.

**Authorization**: [See authorization](#authorization)

#### Request

***title***: The title of the interview. Simple text field.
**content**: Stringified JSON column. Represents rich-text. The value `[]` represents an empty rich-text document.

```json
{
    "title": "Meow mix",
    "content": "[]"
}
```

#### Responses

Good response:

```json
{
    "workspaceId": "idmontie@gmail.com",
    "id": "694f9a2b-fbe0-4452-a3b7-558e7b1d0939",
    "title": "Meow mix",
    "content": "[]",
    "createdAt": "2019-10-29T02:43:16.964Z",
    "updatedAt": "2019-10-29T02:43:16.965Z"
}
```

### GET /interviews/:id

Get a specific interview by it's ID.

**Authorization**: [See authorization](#authorization)

#### Responses

```json
{
    "workspaceId": "idmontie@gmail.com",
    "id": "694f9a2b-fbe0-4452-a3b7-558e7b1d0939",
    "updatedAt": "2019-10-29T02:43:16.965Z",
    "content": "[]",
    "title": "My title",
    "createdAt": "2019-10-29T02:43:16.964Z"
}
```

### PUT /interviews/:id

Update an existing interview by its ID. This endpoint can
be hit many times in a row while the user is editing their rich-text content.

**Authorization**: [See authorization](#authorization)

#### Responses

```json
{
    "workspaceId": "idmontie@gmail.com",
    "id": "694f9a2b-fbe0-4452-a3b7-558e7b1d0939",
    "updatedAt": "2019-10-29T02:43:16.965Z",
    "content": "[{ \"type\": \"text\", \"content\": \"Hello\" }]",
    "title": "My title",
    "createdAt": "2019-10-29T02:43:16.964Z"
}
```

### DELETE /interviews/:id

Delete an interview by its ID. This returns the deleted
item.

**Authorization**: [See authorization](#authorization)

#### Responses

```json
{
    "workspaceId": "idmontie@gmail.com",
    "id": "694f9a2b-fbe0-4452-a3b7-558e7b1d0939",
    "updatedAt": "2019-10-29T02:43:16.965Z",
    "content": "[{ \"type\": \"text\", \"content\": \"Hello\" }]",
    "title": "My title",
    "createdAt": "2019-10-29T02:43:16.964Z"
}
```
