import { flash } from 'react-universal-flash';

export function playPauseError(): void {
  flash(
    10000,
    'premium',
    'Requires a Spotify Premium Account to play/pause the songs'
  );
}

export function adjustVolumeError(): void {
  flash(
    10000,
    'premium',
    'Requires a Spotify Premium Account to adjust volume of the songs'
  );
}

export function playSongError(): void {
  flash(
    10000,
    'premium',
    'Requires a Spotify Premium Account to play the songs'
  );
}

export function skipToNextError(): void {
  flash(
    10000,
    'premium',
    'Requires a Spotify Premium Account to skip to the next song'
  );
}

export function skipToPreviousError(): void {
  flash(
    10000,
    'premium',
    'Requires a Spotify Premium Account to skip to the previous song'
  );
}
