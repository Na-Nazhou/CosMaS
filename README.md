# CS2102 Project - Course Management System

## Pre-requisites

- npm (6.14.5)
- node (14.4.0)
- PostgreSQL (12.3)

## Getting started

1. You may wish to create a new psql database for this project. To do so, first enter the psql console by running `psql YOUR_PSQL_USERNAME`. For fresh installations of psql on macOS, try `psql postgres`.

```sql
CREATE DATABASE cosmas;
```

Replace `cosmas` with any name you like.

2. Create a file named `.env` under the project root directory and copy the content of `.env.template` to it.

```shell
DATABASE_URL=postgres://:@localhost:5432/postgres
SECRET=keyboard cat
```

The database URL is in the format of `postgresql://[user[:password]@][netloc][:port][/dbname]`. Replace anything as required. For example, if you created a database named `cosmas` in the previous step, the database URL might look like `postgres://:@localhost:5432/cosmas`.

3. At the **project root directory**, enter the psql console and then run `\i ./sql/setup.sql;` to create the tables, functions, triggers and seed data.

(Note: we assume that admin will create new semesters beforehand, so we need to manually add new semesters to seed if existing data is outdated.)

Note: existing database tables might be dropped.

4. Run `npm install` to install all the packages and dependencies.

5. Run `npm start`.

6. Open your browser and go to `localhost:3000`, you should see
   the login page. You can login with the accounts created in the seeds or sign up for a new account.

7. The seed data contains an admin account with User ID `A9999999A`, name `Admin` and password `admin`. For non-admin accounts,
   the passwords are `password` and you can refer to `sql/seeds.sql` for their user IDs and names.

## Contributing

- Remember to run `npm run check` and `npm run fix` (if the previous check fails) before you commit!

## Deployment

### Reseed DB

```shell
heroku pg:psql
\i ./sql/setup.sql;
```

### Deploy to Heroku

#### First time

```shell
heroku login
heroku git:remote -a cosmas-cs2102
```

#### Redeploy

```shell
git push heroku master
```
