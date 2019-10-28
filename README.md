# CS2102 Project - Course Management System

### Getting started
- Add an `.env` file to the project root directory and the following information to it. You may change these variables
accordingly.

```
DATABASE URL=postgres://:@localhost:5432/postgres
SECRET=keyboard cat 
```

- Run `psql postgres` and then type `\i ./sql/set_up.sql` to create the tables.

- Run `npm install` to install the dependencies.

- Run `npm start` and go to `localhost:3000`, you should see 
the home page.

*{To be updated}*
- Currently, the following pages should be working:
1. `/signup`
2. `/login`
3. `/logout`
4. `/users`
