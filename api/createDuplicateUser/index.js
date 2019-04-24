/* eslint-disable no-console */
import { auth, chalk, initModel, createUser } from '../commom/imports';

export default async function(req) {
  auth();
  const myData = initModel();
  myData.sync();

  console.log(chalk.red('Creating without duplicate check'));

  let message = 'Created user(s)';
  const myArray = Object.values(req.body);

  for (let index = 0; index < myArray.length; index += 1) {
    createUser(
      myData,
      myArray[index].firstName,
      myArray[index].lastName,
      myArray[index].zipCode,
    );
    message += `: ${myArray[index].firstName} ${myArray[index].lastName} `;
  }
  return message;
}
