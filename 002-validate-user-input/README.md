# Nestjs data validation tutorial

When we're working with application layer. There are couple of things that we're always concerned about them:

1. How to validate request's input ?
2. How to consolidate response's output?
3. How do we treat with errors ?
4. How to support translation ?
5. How to support form validation on client side?

In this example, we will ignore the authentication part. Which will be mentioned in another topic.

## 1. How to validate request's input ?

To solve this issue, our strategy is using **Global Pipe** in NestJS:

- Validate the request's input.
- Convert JSON object to a defined object( which can be useful if we wanna some special feature from a class instance) - using class-transformer
- Validate your object - using class-validator

## 2. How to consolidate response's output?

1. Response Data

Usually, we don't wrap our response data directly, and they almost look like this

```json
{
  "id": 1,
  "title": "Post 1"
}
// or
[
  {"id": 1, "categoryName": "Category 1"},
  {"id": 2, "categoryName": "Category 2"}
]
```

And with status code **200**, the consumer which use http will mark it as a success request with response inside the request's body.

But what's happened, if we don't use http request. And you wanna have fault tolerance system.

My proposal look like this

```json
{
  "success": true, // false
  "statusCode": 200, // statusCode if you want
  "message": "The post had been published", // message
  "messageCode": "blog/post/created", // messageCode - use for translation - format: domain/entityName/{anything has the meaning}
  "data": {
    "result": {"id": 1}
  }, // your data goes here
}
{
  "success": true, // false
  "statusCode": 200, // statusCode if you want
  "message": "ok", // message
  "messageCode": "ok", // messageCode - use for translation - format: domain/entityName/{anything has the meaning}
  "data": {
    "result": [
      {"id": 1, "categoryName": "Category 1"},
      {"id": 2, "categoryName": "Category 2"}
    ]
  }, // your data goes here
}
```

2. Response Error

```json
// failed with generic error
{
  "success": true, // false
  "statusCode": 400, // statusCode if you want
  "message": "Bad Request", // or : Body should be a JSON object
  "messageCode": "generic/error/unauthorized", // messageCode - use for translation - format: domain/entityName/actionInPastTense
  "data": {
  }
},
{
  "success": true, // false
  "statusCode": 401, // statusCode if you want
  "message": "Unauthorized", // message
  "messageCode": "generic/error/unauthorized", // messageCode - use for translation - format: domain/entityName/actionInPastTense
  "data": {
  }
},
{
  "success": true, // false
  "statusCode": 403, // statusCode if you want
  "message": "Forbidden", // message
  "messageCode": "generic/error/forbidden", // messageCode - use for translation - format: domain/entityName/actionInPastTense
  "data": {
  }
},
{
  "success": true, // false
  "statusCode": 422, // statusCode if you want
  "message": "Unprocessable Entity", // message
  "messageCode": "generic/error/unprocessableEntity", // messageCode - use for translation - format: domain/entityName/actionInPastTense
  "data": {
    "errors": [
      {
        "fields": ["title"],
        "errorMessage": "The title is too short, it should contain at least 3 characters",
        "errorCode": "generic/error/field/minLength",
        "errorMeta": { "minLength": 3 }
      },
      {
        "fields": ["productId", "storeId"],
        "errorMessage": "The composition of product id, store id must be unique", // server side check unique base on productId and storeId
        "errorCode": "generic/error/field/compositionDuplicated",
        "errorMeta": { }
      }
    ],
    // or
    "errors": [
      {
        "field": "title",
        "errorMessage": "The title is too short, it should contain at least 3 characters",
        "errorCode": "generic/error/field/minLength",
        "errorMeta": { "minLength": 3 }
      },
      {
        "field": "productId",
        "errorMessage": "The composition of product id, store id must be unique", // server side check unique base on productId and storeId
        "errorCode": "generic/error/field/compositionDuplicated",
        "errorMeta": { }
      },
      {
        "field": "storeId",
        "errorMessage": "The composition of product id, store id must be unique", // server side check unique base on productId and storeId
        "errorCode": "generic/error/field/compositionDuplicated",
        "errorMeta": { }
      },
    ]
  } // your data goes here
}
{
  "success": true, // false
  "statusCode": 500, // statusCode if you want
  "message": "Server Error", // message
  "messageCode": "generic/error/serverError", // messageCode - use for translation - format: domain/entityName/actionInPastTense
  "data": {
  }
},
```
