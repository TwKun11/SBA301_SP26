# API Testing Guide

This guide provides examples for testing the REST API endpoints using curl commands or Postman.

## Base URL

```
http://localhost:8080/api
```

## 1. Account Management APIs

### Login

```bash
curl -X POST http://localhost:8080/api/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "accountEmail": "admin@example.com",
    "accountPassword": "admin123"
  }'
```

### Get All Accounts

```bash
curl -X GET http://localhost:8080/api/accounts
```

### Get Account by ID

```bash
curl -X GET http://localhost:8080/api/accounts/1
```

### Search Accounts

```bash
curl -X GET "http://localhost:8080/api/accounts/search?keyword=john"
```

### Create Account

```bash
curl -X POST http://localhost:8080/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "accountName": "Test User",
    "accountEmail": "test@example.com",
    "accountRole": 2,
    "accountPassword": "password123"
  }'
```

### Update Account

```bash
curl -X PUT http://localhost:8080/api/accounts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "accountName": "Updated Name",
    "accountEmail": "updated@example.com",
    "accountRole": 2,
    "accountPassword": "newpassword123"
  }'
```

### Delete Account

```bash
curl -X DELETE http://localhost:8080/api/accounts/1
```

## 2. Category Management APIs

### Get All Categories

```bash
curl -X GET http://localhost:8080/api/categories
```

### Get Active Categories Only

```bash
curl -X GET http://localhost:8080/api/categories/active
```

### Get Category by ID

```bash
curl -X GET http://localhost:8080/api/categories/1
```

### Search Categories

```bash
curl -X GET "http://localhost:8080/api/categories/search?keyword=education"
```

### Create Category

```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "New Category",
    "categoryDescription": "Description of the category",
    "parentCategoryId": null,
    "isActive": true
  }'
```

### Update Category

```bash
curl -X PUT http://localhost:8080/api/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Updated Category",
    "categoryDescription": "Updated description",
    "parentCategoryId": null,
    "isActive": true
  }'
```

### Delete Category

```bash
curl -X DELETE http://localhost:8080/api/categories/1
```

## 3. Tag Management APIs

### Get All Tags

```bash
curl -X GET http://localhost:8080/api/tags
```

### Get Tag by ID

```bash
curl -X GET http://localhost:8080/api/tags/1
```

### Search Tags

```bash
curl -X GET "http://localhost:8080/api/tags/search?keyword=important"
```

### Create Tag

```bash
curl -X POST http://localhost:8080/api/tags \
  -H "Content-Type: application/json" \
  -d '{
    "tagName": "New Tag",
    "note": "Tag description or note"
  }'
```

### Update Tag

```bash
curl -X PUT http://localhost:8080/api/tags/1 \
  -H "Content-Type: application/json" \
  -d '{
    "tagName": "Updated Tag",
    "note": "Updated note"
  }'
```

### Delete Tag

```bash
curl -X DELETE http://localhost:8080/api/tags/1
```

## 4. News Article Management APIs

### Get All News Articles

```bash
curl -X GET http://localhost:8080/api/news
```

### Get Active News Articles Only

```bash
curl -X GET http://localhost:8080/api/news/active
```

### Get News Article by ID

```bash
curl -X GET http://localhost:8080/api/news/1
```

### Get News by Creator

```bash
curl -X GET http://localhost:8080/api/news/creator/2
```

### Search Active News

```bash
curl -X GET "http://localhost:8080/api/news/search/active?keyword=sports"
```

### Search All News

```bash
curl -X GET "http://localhost:8080/api/news/search/all?keyword=technology"
```

### Search News by Creator

```bash
curl -X GET "http://localhost:8080/api/news/search/creator/2?keyword=event"
```

### Create News Article

```bash
curl -X POST http://localhost:8080/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "newsTitle": "Breaking News: New Campus Opening",
    "headline": "University announces new campus facility opening next month",
    "newsContent": "The university is excited to announce the opening of a new state-of-the-art campus facility that will include modern classrooms, laboratories, and recreational areas. The facility is scheduled to open on March 1, 2026, and will accommodate up to 2000 students.",
    "newsSource": "Administration Office",
    "categoryId": 1,
    "newsStatus": true,
    "createdById": 2,
    "tagIds": [1, 2, 3]
  }'
```

### Update News Article

```bash
curl -X PUT http://localhost:8080/api/news/1 \
  -H "Content-Type: application/json" \
  -d '{
    "newsTitle": "Updated: New Campus Opening",
    "headline": "Updated headline for the news article",
    "newsContent": "Updated content...",
    "newsSource": "Administration Office",
    "categoryId": 1,
    "newsStatus": true,
    "createdById": 2,
    "updatedById": 2,
    "tagIds": [1, 3]
  }'
```

### Delete News Article

```bash
curl -X DELETE http://localhost:8080/api/news/1
```

## Response Examples

### Success Response (200 OK)

```json
{
  "accountId": 1,
  "accountName": "John Smith",
  "accountEmail": "john@example.com",
  "accountRole": 2,
  "accountPassword": null
}
```

### Error Response (400 Bad Request)

```json
{
  "timestamp": "2026-02-02T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists: test@example.com",
  "path": "/api/accounts"
}
```

### Validation Error Response (400 Bad Request)

```json
{
  "timestamp": "2026-02-02T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Validation error on one or more fields",
  "path": "/api/accounts",
  "validationErrors": {
    "accountName": "Account name is required",
    "accountEmail": "Email should be valid"
  }
}
```

### Not Found Response (404 Not Found)

```json
{
  "timestamp": "2026-02-02T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Account not found with id: 999",
  "path": "/api/accounts/999"
}
```

## Testing Scenarios

### Scenario 1: Create Complete News Article

1. Create a category
2. Create some tags
3. Create a news article with those tags
4. Verify the article appears in the list
5. Update the article
6. Delete the article

### Scenario 2: Test Business Rules

1. Create an account
2. Create a news article with that account as creator
3. Try to delete the account (should fail with error message)
4. Delete the news article first
5. Now delete the account (should succeed)

### Scenario 3: Test Search Functionality

1. Create multiple categories with different names
2. Search for specific keyword
3. Verify only matching results are returned

### Scenario 4: Test Validation

1. Try to create account with invalid email (should fail)
2. Try to create account with duplicate email (should fail)
3. Try to create news without required fields (should fail)
4. Try to create category with name longer than 100 chars (should fail)

## PowerShell Commands (Windows)

If using PowerShell, use these commands instead:

### Login (PowerShell)

```powershell
$body = @{
    accountEmail = "admin@example.com"
    accountPassword = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Get All Accounts (PowerShell)

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/accounts" -Method Get
```

### Create Account (PowerShell)

```powershell
$body = @{
    accountName = "Test User"
    accountEmail = "test@example.com"
    accountRole = 2
    accountPassword = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/accounts" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## Postman Collection

Import this into Postman for easier testing:

1. Open Postman
2. Click "Import"
3. Paste the collection JSON or save these as individual requests
4. Set base URL as environment variable: `{{baseUrl}}` = `http://localhost:8080/api`

## Notes

- All endpoints require proper Content-Type headers
- Passwords are returned as null in responses for security
- Delete operations return 204 No Content on success
- Search endpoints return empty arrays if no matches found
- Validation errors return detailed field-level error messages
