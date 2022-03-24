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
    default:
      return state;
  }
};
