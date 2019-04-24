################################################
########  Serverless Logs API          #########
################################################

# Logs API Endpoints
## The Logs API points that will let access and interactions to logs entity possible

* `createUser` - :: Adds an array of users to the database.
* `createDuplicateUser` - :: Adds an array of users to the database even if they already exist.
* `readUserById` - :: Reads an entry from the database using a passed id.
* `readAll` - :: Reads all users from the database.
* `updateById` -:: Updates an entry from the database using a passed id.
* `deleteUser` -:: Deletes a user from the database using a passed id.

# Running It

- Start the server with "yarn run start"

## The file structure is explained below

- <root folder> (in this case `api-logs`)
	- `README.md` (documentation to understand codebase)
	- `.gitignore` file
	- `.babelrc` (file for babel configuration)
	- `.eslintrc` (file for babel configuration)
	- `.flowconfig` (file for babel configuration)
	- `package.json` (modules declaration file for this serverless project)
	- `config` (this directory contains all env and test config))
	- `api` (this directory contains the project files and functions)
		- `_lib` (this directory contains db setup)
		- `serverless.yml` (the main config file for the serverless project)
			we declare endpoints here , in addition to AWS lambda property values. 

## Create Table Query, should be done in a database called Users unless the code is going to be changed:
CREATE TABLE `information` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) DEFAULT NULL,
  `lastName` varchar(200) DEFAULT NULL,
  `zipCode` int(5) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;