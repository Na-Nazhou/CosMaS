# CS2102 Project - Course Management System

### Pre-requisites

- npm (6.14.5)
- node (14.4.0)
- PostgreSQL (12.3)

### Getting started

1. Create a file named `.env` under the project root directory and copy the content in the `.env.template` to it.

```
DATABASE_URL=postgres://:@localhost:5432/postgres
SECRET=keyboard cat
```

2. At the **project root directory**, run `psql postgres` and then run `\i ./sql/setup.sql;` to create the tables, functions, triggers and seed data.

(Note: we assume that admin will create new semesters beforehand, so we need to manually add new semesters to seed if existing data is outdated.)

Note: existing database tables might be dropped.

3. Run `npm install` to install all the packages and dependencies.

4. Run `npm start`.

5. Open your browser and go to `localhost:3000`, you should see
   the login page. You can login with the accounts created in the seeds or sign up for a new account.

6. The seed data contains an admin account with User ID `A9999999A`, name `Admin` and password `admin`. For non-admin accounts,
   the passwords are `password` and you can refer to `sql/seeds.sql` for their user IDs and names.

### Contributing

- Remember to run `npm run check` and `npm run fix` (if the previous check fails) before you commit!

### Deployment

#### DB reseed:
```
heroku pg:psql
\i ./sql/setup.sql;
```

#### Deploy to Heroku: 

First time only:
```
heroku login
heroku git:remote -a cosmas-cs2102
```
```
git push heroku master
```