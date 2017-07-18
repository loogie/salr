// users reducer
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return Object.assign({}, action.user);
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
}
