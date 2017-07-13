// users reducer
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_CONN':
      return Object.assign({}, action.user);
    case "USER_CLEAR":
      return {};
    default:
      return state;
  }
}
