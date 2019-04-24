/* eslint-disable no-console */
import { auth, initModel, deleteUserID } from '../commom/imports';

export default async function(req) {
  auth();
  const myData = initModel();
  myData.sync();

  deleteUserID(myData, req.params.passedId);
  return 'Deleted';
}
