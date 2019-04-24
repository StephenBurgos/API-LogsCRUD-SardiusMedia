/* eslint-disable no-console */
import { auth, initModel } from '../commom/imports';

export default async function() {
  auth();
  const myData = initModel();
  myData.sync();
  return myData.findAll({}).map(data => data.get({ plain: true }));
}
