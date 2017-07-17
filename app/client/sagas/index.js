import userSagas from './user';
import testSagas from './testUser';

// main saga generators
export function* sagas() {
  yield [testSagas()];
}
