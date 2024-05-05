## CENG 495 Cloud Computing - HW2
Mustafa Burak Akkaya - 2396968


## Technologies
Database: MongoDB

Backend: NodeJS, Express

Frontend: VueJS, Vite


-----
## Docker Ports

* frontend: 5173
* auth-server: 3000
* expense-server: 3001
* expense-group-server: 3002
* mongo: 27017

-----
## Requirements

* NodeJS (v18.18.0)
* NPM (v9.8.1)

-----

## Backend Dependencies

* body-parser (^1.20.2)
* cors (^2.8.5)
* express (^4.18.3)
* mongodb (^6.5.0)

## Running the Backend Applications

```bash
# move to be folder
$ cd be

# install dependencies
$ npm install

# run the application
$ node server.js
```

-----

## Frontend Dependencies

* pg (^8.10.0)
* axios (^1.6.7)
* bootstrap (5.3.3)
* pinia (^2.1.7)
* vue (^3.4.21)
* vue-router (^4.3.0)
* vite (^5.1.6)

## Running the Frontend Application

```bash
# move to fe folder
$ cd fe

# install dependencies
$ npm install

# run the application
$ npm run dev
```