/* eslint-disable no-console */
import { auth, initModel, updateUser } from '../commom/imports';

export default async function(req) {
  auth();
  const myData = initModel();
  myData.sync();

  updateUser(
    myData,
    req.body.firstName,
    req.body.lastName,
    req.body.zipCode,
    req.params.passedId,
  );
  return 'Updated';
}
