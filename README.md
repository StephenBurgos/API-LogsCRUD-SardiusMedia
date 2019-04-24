################################################
########  Serverless Logs API          #########
################################################

# Logs API Endpoints
## The Logs API points that will let access and interactions to logs entity possible

* `billingAddDuration` - :: edge function adds entry time to request
* `billingCaptureData` - :: edge function that captures raw event data to S3
* `billingExportData` - :: main lambda function that processes the raw data and stores it in both s3 and rds Aurora

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
	- `api` (this directory contains the project files)
		- `_lib` (this directory contains db and s3 setup and functions)
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