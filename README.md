# NPS
## <nlw /> edition # 04

#### NPS stands for Net Promoter Score which in a direct translation means “Average referral score”.
#### The purpose of this analysis is to find out if there are more people indicating or speaking badly about your product and service. 
#### A brand with negative NPS has a great chance of having very low growth or having to invest a lot to grow.

## Api-nodejs-backend 😎 🥁
Concepts of this project, API, NodeJS, TypeScript, integration with databases, migrations, isolation of abstraction layers, models, controllers, Repository, Routes, Automated Tests, sending e-mail using customized templates with information from the database.

#### Stacks 🚀
```bash
NodeJS
TypeScript
sqlite3
express
```

### Testing specification 🤖
### Testing Framework used
* [Jest](https://jestjs.io/)
* [SuperTest](https://github.com/visionmedia/supertest)
* [The Fake.js](https://github.com/marak/Faker.js/)
Faker library was used to mock the data used in the execution of the tests, this allows to perform tests with different types of information in the input data.

### For this project I have the following tests: 🤖 ✅

*should not be able to send email without survey registered
*should not be able to send mail with empty survey_id
*should not be able to send mail without attribute email
*should be able to create a new survey
*should be able to get all surveys
*should not be able to create a new survey without title
*should not be able to create a new survey without description
*should not be able to create a user with already email exists
*should not be able to create a user without email
*should not be able to create an unnamed user attribute

### setup

Install the dependencies:<br/>
Make sure [Node.js](https://nodejs.org/) is installed <br/>
Navigate to the root of the repo <br/>

#### yarn
```bash
yarn install
yarn dev
``` 
Run the tests:
#### Supertest
```bash
yarn test
```

## Integrations
## CI ✅
This project is integrated with a continuous integration tool [Circle Ci](https://circleci.com/) for feedback on improvements and execution of tests, a new build is launched at each commit for the main branch. <br/> <br/>
![CircleCI](https://img.shields.io/circleci/build/github/heziofernandes/nps-nlw04)

## Code Analise ✅
There is also integration with a code analysis tool, [Code Climate](https://codeclimate.com/) where it is possible to measure the level of project maintenance and other standards of good practice. <br/> <br/>
![Code Climate](https://img.shields.io/codeclimate/maintainability-percentage/heziofernandes/nps-nlw04?style=plastic)

## Application routes
```
POST/users:
```
* The route must receive name, email within the body of the request. 
```
GET/surveys:
```
* Route that lists all surveys with id, title, description, date creation;
```
POST/surveys
```
* The route must receive title and description within the body of the request. 
```
POST/sendEmail
```
* The route must receive email and survey ID within the body of the request. 
```
GET/calculate:
```
* The route must display a json object with the results of an NPS when passed the Survey ID by parameter


