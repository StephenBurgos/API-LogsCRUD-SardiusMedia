/* eslint-disable no-console */
import { auth, initModel, createNoDupe } from '../commom/imports';

export default async function(req) {
  auth();
  const myData = initModel();
  myData.sync();

  let message = 'Created user(s)';
  const myArray = Object.values(req.body);
  for (let index = 0; index < myArray.length; index += 1) {
    createNoDupe(
      myData,
      myArray[index].firstName,
      myArray[index].lastName,
      myArray[index].zipCode,
    );
    message += `: ${myArray[index].firstName} ${myArray[index].lastName} `;
  }
  message += ': or they already existed.';
  return message;
}
