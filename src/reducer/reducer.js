export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };
    case "SET_LIKED_VIDEOS":
      return { ...state, likes: action.payload };
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.payload };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, modal: !state.modal };
    case "SELECTED_VIDEO":
      return { ...state, selectedVideo: action.payload };
    case "TOGGLE_DRAWER":
      return { ...state, drawerState: !state.drawerState };
    case "SET_WATCHLATER":
      return { ...state, watchlater: action.payload };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_CATEGORY":
      return { ...state, filterCategory: action.payload };
    case "TOGGLE_LOADING":
      return { ...state, loading: { ...state.loading, ...action.payload } };
    case "ACTIVATE_ALERT":
      return {
        ...state,
        alert: {
          message: action.payload.message,
          active: true,
          color: action.payload.color,
        },
      };
    case "DEACTIVATE_ALERT":
      return {
        ...state,
        alert: { message: null, active: false, color: "green" },
      };
    default:
      return state;
  }
};
