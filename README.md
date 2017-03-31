# Spaced Repetition
![alt text](http://res.cloudinary.com/coleman/image/upload/v1486049755/spacedRepititionLearning_nwyoit.png "Spaced Repetition Learning")

Built by Nick Coleman and Jamie Davella

[Spaced Repetition Demo](https://germanrepitition.herokuapp.com "Learn German")

## Design

### Tech Stack
* React and Redux - Client
* Node.js/Express - Server
* MongoDB
* Passport OAuth and Google Authentication

### Features
* Question Sets are downloaded to the client
  - potentially could be accessed later without internet connectivity
  - Limits calls to server/backend
* Client calls Server for Question Sets and is responsible for managing the Question Sets
* Server is responsible for database management/queries and authentication only
* Design allows 
   - multiple level users (eg. Level 1 is beginner, Level 2 is intermediate)
   - multiple question sets with each level

### Algorithm - App uses a simplified Spaced Repetition algorithm 
* Right Answer are moved to end of stack
* Wrong Answers are moved back 3 positions
* User continues until all are answered correct
* Then is presented with the next question set

![](http://res.cloudinary.com/coleman/image/upload/v1486050956/SRQuestionSet_ufisow.png)
![](http://res.cloudinary.com/coleman/image/upload/v1486050956/SRReact-Redux_lyvqi6.png)
![](http://res.cloudinary.com/coleman/image/upload/v1486050956/SRSchema_pruyn0.png)

## Getting started

### Setting up a project

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://github.com/davellaj/flashCardApp YOUR_PROJECT_NAME`
* Move into the project directory: `cd YOUR_PROJECT_NAME`
* Install the dependencies: `npm install`
* Create a new repo on GitHub: https://github.com/new
    * Make sure the "Initialize this repository with a README" option is left **un**checked
* Update the remote to point to your GitHub repository: `git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm run dev`
    * Starts a server running at http://localhost:8080
    * Automatically rebuilds when any of your files change

## Directory layout

```
.
├── client      Client-side code
│   ├── assets  Images, videos, etc.
│   ├── js      JavaScript
│   └── scss    SASS stylesheets
├── server      Server-side code
└── test        Tests
    ├── client  Client tests
    └── server  Server tests
```

