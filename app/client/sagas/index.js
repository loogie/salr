import userSagas from './user';
// main saga generators
export function* sagas() {
  yield [userSagas()];
}
