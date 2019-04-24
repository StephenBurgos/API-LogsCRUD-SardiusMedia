/* eslint-disable no-console */
import getDB from '../_lib/db/db';

// eslint-disable-next-line global-require
export const chalk = require('chalk');

export const db = getDB();

// Checks connection to the database
export function auth() {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log(
        chalk.green.underline.bold(
          'Connection has been established successfully.',
        ),
      );
    })
    .catch(err => {
      console.log(
        chalk.red.underline.bold('Unable to connect to the database:'),
        chalk.red.underline.bold(err),
      );
    });
}

// A prototype for downloading database data
export function initModel() {
  const User = db.sequelize.define(
    'information',
    {
      firstName: {
        type: db.Sequelize.STRING,
        length: 200,
      },
      lastName: {
        type: db.Sequelize.STRING,
        length: 200,
      },
      zipCode: {
        type: db.Sequelize.INTEGER,
        length: 5,
      },
    },
    {
      freezeTableName: true,
    },
  );
  return User;
}

// Searches for matching entries and returns them
export function findEntriesInModel(model, id) {
  return model
    .findAll({
      where: {
        id,
      },
    })
    .map(data => data.get({ plain: true }));
}

export function createNoDupe(model, first, last, zip) {
  model
    .findOrCreate({
      where: {
        firstName: first,
        lastName: last,
        zipCode: zip,
      },
    })
    .then(() => {
      console.log(
        chalk.green(
          `Created user ${chalk.blue(first)} ${chalk.blue(
            last,
          )} or they already existed.`,
        ),
      );
    });
}

export function createUser(model, first, last, zip) {
  model
    .create({
      firstName: first,
      lastName: last,
      zipCode: zip,
    })
    .then(created => {
      console.log(
        chalk.green.bold(
          `Generated ${chalk.blue.bold(created.firstName)} ${chalk.blue.bold(
            created.lastName,
          )} with id ${chalk.blue.bold(created.id)}`,
        ),
      );
    });
}

// Deletes a user from model based on first name and last name
export function deleteUser(model, first, last, zip) {
  model
    .destroy({
      where: {
        firstName: first,
        lastName: last,
        zipCode: zip,
      },
    })
    .then(numberDeleted => {
      if (numberDeleted > 0) {
        console.log(
          chalk.red(`Deleted ${chalk.blue(first)} ${chalk.blue(last)}`),
        );
      } else {
        console.log(
          chalk.red(
            `${chalk.blue(first)} ${chalk.blue(
              last,
            )} did not exist in the database.`,
          ),
        );
      }
    });
}

// Prints all users in model to the console
export function findUsers(model) {
  model.findAll().then(users => {
    console.log(chalk.blue('All users:', JSON.stringify(users)));
  });
}

// Updates a zip code
export function updateUser(model, first, last, zip, id) {
  model
    .update(
      {
        firstName: first,
        lastName: last,
        zipCode: zip,
      },
      {
        where: {
          id,
        },
      },
    )
    .then(() => {
      console.log(chalk.green.bold(`Updated user ${chalk.blue.bold(id)}`));
    });
}

export function deleteUserID(model, id) {
  model
    .destroy({
      where: {
        id,
      },
    })
    .then(numberDeleted => {
      if (numberDeleted > 0) {
        console.log(chalk.red(`Deleted user with id ${chalk.blue(id)}`));
      } else {
        console.log(
          chalk.red(
            `User with id ${chalk.blue(id)} did not exist in the database.`,
          ),
        );
      }
    });
}
