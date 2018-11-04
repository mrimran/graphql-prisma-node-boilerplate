# graphql-prisma-node-boilerplate
GraphQL Boilerplate using NodeJS and Prisma

## Setup
- Edit `config/dev.env` and `config/test.env` to make appropriate changes for your new project
- Make similar changes to the `endpoints` in `.graphqlconfig`
- `cd prisma`
- `prisma deploy -e ../config/dev.env`
- `prisma deploy -e ../config/test.env`
- `cd ..`
- `npm install`
- `npm run get-schema`

This is it now run `npm run test`, which should pass 5 tests and will generate output like below: 

```
Test Suites: 0 of 1 total
 PASS  tests/user.test.js (17.749s)  ✓ Create new user (5326ms)
  ✓ Expose public author profiles (2914ms)
  ✓ Dont login with bad credentials (2977ms)  ✓ Cannot signup with short password (2778ms)  ✓ fetch user profile (2974ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        18.31s
```
