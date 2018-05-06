export default (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_SELECTED_AD":
      return { ...state, ...payload };
    default:
      return state;
  }
};
