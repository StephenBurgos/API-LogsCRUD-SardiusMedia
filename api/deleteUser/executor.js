/* eslint-disable no-console */
import reqRes from '../_lib/reqres';
import deleteUser from './index';

const chalk = require('chalk');

const handler = reqRes(async (req, res) => {
  try {
    const response = await deleteUser(req);
    res.json({ message: response });
  } catch (err) {
    console.log(chalk.red(err));
    res.error(err);
  }
}).cors(true).run;

module.exports = { handler };
