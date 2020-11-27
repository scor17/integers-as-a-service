# API Documentation

`/accounts` For creating and retrieving an account.
```
POST /v1/accounts

Body
{
  "data": {
    "type": "accounts",
    "attributes": {
      "email": "test@test.com",
      "password": "12345"
    }
  }
}

Returns
{
  "data": {
    "type": "accounts",
    "id": "{uuid}",
    "attributes": {
      "email": "test@test.com",
      "password": "12345",
      "token": "{API Bearer Auth Token}"
    }
  }
}
```
Your account will be returned based on the accountId contained in the token.
```
GET /v1/accounts
Authorization: Bearer {Your bearer Token}

Returns
{
  "data": {
    "type": "accounts",
    "id": "{uuid}",
    "attributes": {
      "email": "test@test.com"
    }
  }
}
```

`/auth` for retrieving your token if you've lost it.
```
POST /v1/auth

Body
{
  "data": {
    "type": "auth",
    "attributes": {
      "email": "test@test.com",
      "password": "12345"
    }
  }
}

Returns
{
  "data": {
    "type": "auth",
    "attributes": {
      "token": "{API Bearer Auth Token}"
    }
  }
}
```

`/integers` routes for the main business logic around integer generation.
```
GET /v1/integers/current
Authorization: Bearer {Your bearer Token}

Returns
{
  "data": {
    "type": "integers",
    "id": "{uuid}"
    "attributes": {
      "accountId": "{uuid}",
      "current": 1000
    }
  }
}
```

```
PUT /v1/integers/current
Authorization: Bearer {Your bearer Token}

Body
{
  "data": {
    "type": "integers",
    "attributes": {
      "current": 100
    }
  }
}

Returns
{
  "data": {
    "type": "integers",
    "id": "4389bad1-c40a-4090-90d5-3487300cfd6d",
    "attributes": {
      "accountId": "2057d292-eb5f-4ab9-b43b-ea1d0e5ecbc2",
      "current": 100
    }
  }
}
```

```
POST /v1/integers/next
Authorization: Bearer {Your bearer Token}

Returns
{
  "data": {
    "type": "integers",
    "id": "4389bad1-c40a-4090-90d5-3487300cfd6d",
    "attributes": {
      "accountId": "2057d292-eb5f-4ab9-b43b-ea1d0e5ecbc2",
      "current": 101
    }
  }
}
```