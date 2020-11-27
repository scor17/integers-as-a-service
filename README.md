## Notes

Thanks for taking the time to review my submission :)

[API Reference](https://github.com/scor17/integers-as-a-service/blob/main/DOCUMENTATION.md)

### Date

2020-11-27

### Location of deployed application

Service: https://integers-as-a-service.herokuapp.com/v1  
UI: https://scor17.github.io/integers-ui/

### Time spent

6-7 hours in total

### Assumptions made

#### API Key
* Non-expiring auth was valid for this service
* No specifc format was required, I chose JWT so that I could include identity info, but it's not traditional for API Keys

#### Data storage
* We wouldn't need to enable concurrent writes for this assignment, I used a file based storage system so there could be data loss if multiple write requests were happening at the same time

#### API Endpoints
* Routes and request payload provided were just guidelines and not exactly what should be implemented

#### UI
* I definitely assumed I wouldn't be judged on the appearance of the UI ;)

### Shortcuts/Compromises made
1. The biggest one would be that I didn't use a proper database. This wouldn't fly in the real world, but made sense for a simple assigment.
2. My previous experience has been with the OpenAPI spec. I'd like to take more time to read the JSON:API spec and see if I could model the APIs better.
3. Related to not knowing the spec very well, but I'd like to go back and create models for my domain objects.
4. Would need to write tests for this in the real world as well.

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you
could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

Complete:
* Deployment
* UI

Incomplete:
* Login with OAuth

Deployments: I had never used either Heroku or GitHub pages before. I was super happy with how easy it was to get it up and running.

UI: It's been a while since I implemented UI without a UI Designer's guidance, but it's functioning at least. It was nice getting to use React's Context API and useReducer hooks. I've only been working in larger apps so I tend to use Redux.

OAuth: It was just getting to the point where I was running out of time so I didn't get a chance to work on this.

### Instructions to run assignment locally

Need NodeJS installed  

#### Service:

Create a `.env` file in the root with the following contents.
```
PORT={enter a port}
JWT_SECRET={enter a string}
```
Run `npm install` and `npm run start`

#### UI:

Create a `.env` file in the root with the following contents.
```
REACT_APP_API_BASE_URL={API URL eg. http://localhost:8080/v1}
```
Run `npm install` and `npm run start`

### What did you not include in your solution that you want us to know about?
Nothing that I didn't already mention above.

### Other information about your submission that you feel it's important that we know if applicable.
I implemented an auth API to get a new API key if you've lost the previous one. You pass your email and password and it will compare password hashes and serve up a new token if valid.

### Your feedback on this technical challenge

It was great, I got to use some things I'd never used before!