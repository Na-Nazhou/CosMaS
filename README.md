# CS2102 Project - Course Management System

### Pre-requisites

- npm (6.10.2)
- node (12.9.0)
- PostgreSQL (11.5)

### Getting started

1. Create a file named `.env` under the project root directory and copy the content in the `.env.template` to it.

```
DATABASE_URL=postgres://:@localhost:5432/postgres
SECRET=keyboard cat
```

<!-- TODO:Write a script to run these commands -->

2. Run `psql postgres` and then run `\i ./sql/set_up.sql;` to create the tables.

3. Run `\i ./sql/functions.sql;` followed by `/i ./sql/triggers.sql;` to create the functions and triggers.

Note: existing database tables might be dropped.

<!-- TODO:Add to seeds -->

4. To create an admin user, run the following command inside psql:

```
INSERT INTO users VALUES ('A9999999A', 'Admin', 'True', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');
```

An admin user with User ID `A9999999A`, name `Admin` and password `admin` will be created.

<!-- TODO:End -->

5. Run `npm install` to install all the packages and dependencies.

6. Run `npm start`.

7. Open your browser and go to `localhost:3000`, you should see
   the login page. You can login with the admin account created earlier or sign up for the a new account.

### Contributing

- Remember to run `npm run check` and `npm run fix` (if the previous check fails) before you commit!
