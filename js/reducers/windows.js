import { WINDOWS } from "../constants";
import {
  SET_FOCUSED_WINDOW,
  TOGGLE_MAIN_WINDOW,
  TOGGLE_EQUALIZER_WINDOW,
  CLOSE_EQUALIZER_WINDOW,
  TOGGLE_PLAYLIST_WINDOW,
  CLOSE_GEN_WINDOW,
  OPEN_GEN_WINDOW,
  ADD_GEN_WINDOW,
  UPDATE_WINDOW_POSITIONS
} from "../actionTypes";

import { arrayWith, arrayWithout } from "../utils";

const defaultWindowsState = {
  focused: WINDOWS.MAIN,
  mainWindow: true,
  equalizer: true,
  playlist: true,
  openGenWindows: [],
  genWindows: {},
  positions: {}
};

const windows = (state = defaultWindowsState, action) => {
  switch (action.type) {
    case SET_FOCUSED_WINDOW:
      return { ...state, focused: action.window };
    case TOGGLE_MAIN_WINDOW:
      return { ...state, mainWindow: !state.mainWindow };
    case TOGGLE_EQUALIZER_WINDOW:
      return { ...state, equalizer: !state.equalizer };
    case CLOSE_EQUALIZER_WINDOW:
      return { ...state, equalizer: false };
    case TOGGLE_PLAYLIST_WINDOW:
      return { ...state, playlist: !state.playlist };
    case CLOSE_GEN_WINDOW:
      return {
        ...state,
        openGenWindows: arrayWithout(state.openGenWindow, action.windowId)
      };
    case ADD_GEN_WINDOW:
      return {
        ...state,
        openGenWindows: action.opened
          ? arrayWith(state.openGenWindow, action.windowId)
          : state.openGenWindows,
        genWindows: {
          ...state.genWindows,
          [action.windowId]: { title: action.title }
        }
      };
    case OPEN_GEN_WINDOW:
      return {
        ...state,
        openGenWindows: arrayWith(state.openGenWindow, action.windowId)
      };
    case UPDATE_WINDOW_POSITIONS:
      return {
        ...state,
        positions: { ...state.positions, ...action.positions }
      };
    default:
      return state;
  }
};

export default windows;
