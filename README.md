# merng-social-app

> A social media application created to further skills in React, GraphQL, MongoDB, and Node.js. As well as Semantic UI/CSS. This is a bit of a dev 'blog' I guess...

### Progress

> Finished tutorial video, nailing down goals, working on backend for user page/edit profile resolvers/typeDefs. Also, going to set up git repo first then start working on all of this.

### Goals

> These are just notes for me.

- [x] User Page
  - [x] Add mutations for GraphQL - getUsers; getUser
    - [x] Tested on GraphQL Playground
  - [x] Create routes/pages on React frontend - '/user(s)'
  - [x] Map user/users with Semantic UI Cards
    - [x] UsersPage
    - [x] UserProfile
      - [x] Update MenuBar to show Home always and if logged in put username on the far right side of MenuBar.
- [x] Cool, completely useless, but cool looking little OP badge on posts.
- [ ] DARK MODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  - [ ] Needs done asap as I hate working on this at night atm
    - [ ] May add this to mongo schema even to save preferences over devices, for now local storage lol
    - [ ] Research different ways to implement this. Different .css files, classes, applied at App level or spread across all pages/components?
- [ ] Profile Update Page
  - [ ] GraphQL mutations - steams off getUser; editUser
  - [ ] Create semantic forms to display current info.
    - [ ] File upload for profile pictures
      - [x] Update user schema to accept buffers; hopefully this works?
      - [ ] Add mutations and update queries for profile pictures. Find default and include that in account creation process?
- [x] Add likes (maybe replies?) to comments
  - [x] Update mongo schema
  - [x] Update all mutations that'll require this info
  - [ ] Add to frontend
- [ ] Completely change the app so creating a post takes you to a new editor and gives more options with formatting.

### Resources

Video - https://youtu.be/n1mdAPFq2Os
Semantic UI - https://react.semantic-ui.com/

### Push Information

- April 5, 2021

  - ADD: Initial push. Everything after this was done by myself and my good friends Google, StackOverflow, and Github. Everything before was following on a tutorial.

- April 5, 2021

  - ADD: Setup backend for `getUser` and `getUsers(id)` queries. Setup frontend to display user list and user profile.

- April 6, 2021
  - UPDATE: Updating user/post mongoose schemas to reflect new changes of likes and comments containing comments (not too sure if thatll work yet) as well as updating typeDefs to accommodate for these changes as well

## Contributing

This is a personal project to push forward my own skills and learn new tools. Feel free to fork and work on your own additions/fixes and please do share them in the pull requests or issues.
