import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { flash } from 'react-universal-flash';

import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { currentUserState } from '../atoms/userAtom';
import { useState } from 'react';

const Song = ({ order, track, isNonPremiumUser }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const currentUser = useRecoilValue(currentUserState);

  function playSong() {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    if (
      Boolean(currentUser.hasOwnProperty('product')) &&
      currentUser?.product === 'premium'
    ) {
      spotifyApi
        .play({
          uris: [track.track.uri],
        })
        .then((res) => {
          console.log('Playback Started!!');
        })
        .catch((error) => {
          console.error('Error: ', error);
          // if (error?.error?.status === 403) {
          //   console.log('You need to be a Premium User to play the song!');
          // }
        });
    } else {
      isNonPremiumUser();
    }
  }

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <Image
          src={track.track.album.images[0].url}
          alt={'Sound Track Image'}
          width={40}
          height={40}
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
