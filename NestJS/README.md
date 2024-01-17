# Node project setup ( PALM INFOTECH )
## Setup project

- Create new project 
    > nest new project-name
- Initial steps
    - Create following files 
        - index.js --> routing app to main.ts file
        - pm2 folder in root project folder
            - startup.json
        - src/api -> consist all api modules
            -  ex. user
            -  ex. kitchen
        - src/common -> global folder for
            - filters
            - helper 
            - query 
            - validator
        - src/shared module folder
            - service
                - config.service.ts
                - sql.service.ts
            - typeorm
                - typeorm.config.ts
        - .env , .env.production and .env.staging file with global variables
        - swagger.ts file


#### Add following scripts in package.json file
> "staging": "pm2 kill && pm2 start pm2/startup.json --env staging && pm2 flush && pm2 log",
> "production": "pm2 start pm2/startup.json --env production && pm2 flush && pm2 log",

###### Make sure to get port from the config service file while setting up the project

### After successfully connecting to database

- add accelator and bin folder
- after adding above two files run below command in terminal
    > yarn add --dev chalk@4.1.2 arg inquirer@8.2.0 fs listr ncp util handlebars esm && npm link
- after successfully link run:-
    > create-api
- Enter your module name and check whether it is created or not.
