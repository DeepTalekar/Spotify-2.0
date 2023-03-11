import { atom } from 'recoil';

export const currentUserState = atom({
  key: 'currentUserState', // * Unique Id (wrt other atoms/selectors)
  default: null, // * Default value (aka initial value)
});

export const showFlashPremiumErrorState = atom({
  key: 'showFlashPremiumErrorState',
  default: false,
});
