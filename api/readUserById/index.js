/* eslint-disable no-console */
import { auth, initModel } from '../commom/imports';

function getUserWithId(model, id) {
  return model
    .findAll({
      where: {
        id,
      },
    })
    .map(data => data.get({ plain: true }));
}

export default async function(req) {
  auth();
  const myData = initModel();
  myData.sync();
  return getUserWithId(myData, req.params.passedId);
}
