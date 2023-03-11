import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackIdState', // * Unique Id (wrt other atoms/selectors)
  default: null, // * Default value (aka initial value)
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
