import { ACTION_TYPE } from "../utils";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ACTION_TYPE.SET_VIDEOS:
      return { ...state, videos: action.payload };
    case ACTION_TYPE.SET_LIKED_VIDEOS:
      return { ...state, likes: action.payload };
    case ACTION_TYPE.SET_PLAYLISTS:
      return { ...state, playlists: action.payload };
    case ACTION_TYPE.SET_HISTORY:
      return { ...state, history: action.payload };
    case ACTION_TYPE.TOGGLE_MODAL:
      return { ...state, modal: !state.modal };
    case ACTION_TYPE.SELECTED_VIDEO:
      return { ...state, selectedVideo: action.payload };
    case ACTION_TYPE.TOGGLE_DRAWER:
      return { ...state, drawerState: !state.drawerState };
    case ACTION_TYPE.SET_WATCHLATER:
      return { ...state, watchlater: action.payload };
    case ACTION_TYPE.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    case ACTION_TYPE.SET_CATEGORY:
      return { ...state, filterCategory: action.payload };
    case ACTION_TYPE.TOGGLE_LOADING:
      return { ...state, loading: { ...state.loading, ...action.payload } };
    case ACTION_TYPE.ACTIVATE_ALERT:
      return {
        ...state,
        alert: {
          message: action.payload.message,
          active: true,
          color: action.payload.color,
        },
      };
    case ACTION_TYPE.DEACTIVATE_ALERT:
      return {
        ...state,
        alert: { message: null, active: false, color: "green" },
      };
    default:
      return state;
  }
};
