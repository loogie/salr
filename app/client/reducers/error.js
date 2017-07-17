export default function errorReducer(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      console.log(action.error)
      return Object.assign({}, action.error);
    default:
      return state;
  }
}
