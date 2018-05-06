export default (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_USER_TOKEN":
      return { ...state, ...payload };
    default:
      return state;
  }
};
