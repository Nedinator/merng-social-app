# merng-social-app

> A social media application created to further skills in React, GraphQL, MongoDB, and Node.js. As well as Semantic UI/CSS. This is a bit of a dev 'blog' I guess...

### Progress

> Finished tutorial video, nailing down goals, working on backend for user page/edit profile resolvers/typeDefs. Also, going to set up git repo first then start working on all of this.

### Goals

> These are like notes for me pretty much -

- [ ] User Page
  - [x] Add mutations for GraphQL - getUsers; getUser
    - [x] Tested on GraphQL Playground
  - [x] Create routes/pages on React frontend - '/user(s)'
  - [ ] Map user/users with Semantic UI Cards
    - [x] UsersPage
    - [x] UserProfile
      - [ ] I'll obviously have to update the mongodb schema and include a bio as well as some other dev based things too. ima put ideas for that down below.
      - [x] Update MenuBar to show Home always and if logged in put username on the far right side of MenuBar.
- [ ] DARK MODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  - [ ] Needs done asap as I hate working on this at night atm
    - [ ] May add this to mongo schema even to save preferences over devices, for now local storage lol
    - [ ] Research different ways to implement this. Different .css files, classes, applied at App level or spread across all pages/components?
- [ ] Profile Update Page
  - [ ] GraphQL mutations - steams off getUser; editUser
  - [ ] Create semantic forms to display current info.
    - [ ] Password is going to be extra hard
    - [ ] As well as uploading profile pictures and storing them... somewhere?
- [ ] Add likes (maybe replies?) to comments
  - [ ] Update mongo schema
  - [ ] Update all mutations that'll require this info
    - [ ] I'll add these once I get closer.
- [ ] May make CommentSection its own component.

### Resources

Video - https://youtu.be/n1mdAPFq2Os
Semantic UI - https://react.semantic-ui.com/

### Push Information

- April 5, 2021

  - ADD: Initial push. Everything after this was done by myself and my good friends Google, StackOverflow, and Github. Everything before was following on a tutorial.

- April 5, 2021
  - ADD: Setup backend for `getUser` and `getUsers(id)` queries.

## Contributing

This is a personal project to push forward my own skills and learn new tools. Feel free to fork and work on your own additions/fixes and please do share them in the pull requests or issues.
