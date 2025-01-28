
# Fresh Rituals

A web platform for beginner skincare enthusiasts who need a little extra help getting started. This platform creates personalized routines based off your personal skincare needs. Users are able to save their favourite products under a special section to retrieve these products later.


## Run Locally

Clone the project

```bash
  git clone https://github.com/sadia-b/capstone-backend.git
```

Go to the project directory

```bash
  cd my-project
```


## Getting started
This is the backend API that can be used in conjunction with the front-end that can be found on my GitHub.

### Prerequisites

- npm
```bash
  npm install
```

### Installation

- Install all required packages

```bash
  npm i knex mysql2 dotenv express
```

This is the front-end of the web application, the back-end must be installed and used alongside.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Use the .env.example file as a guide.

`PORT`

`DB_HOST`

`DB_USER`

`DB_PASSWORD`




## Deployment

To use knex run the following migrations and seeds:

```bash
  npx knex migrate:latest
```

and 

```bash
  npx knex seed:run
```

To delete a migration, run
```bash
  npx knex migrate:rollback
```


## API Reference

#### Get all products

```http
  GET /products
```
Returns all skincare products.

#### Get products by concern

```http
  GET /products/${concern}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `concern` | `string` | **Required**. Skincare concern to fetch |

#### Post products by id

```http
  PUT /products/${id}
```

| Parameter | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `id`      | `integer` | **Required**. Product ID to edit product |

#### Post favourite to add to favourites list

```http
  POST /favourite
```

#### Get favourites

```http
  GET /favourite
```

#### Get products by concern

```http
  GET /favourite/${id}
```

| Parameter | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `id`      | `integer` | **Required**. Favourite ID to remove from favourites list |




## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/sadia-b)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sadia-bahadoor/)


