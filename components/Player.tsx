import React, { useCallback, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSongInfo from './../hooks/useSongInfo';
import Image from 'next/image';
import {
  HeartIcon,
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
  SpeakerWaveIcon as VolumeDownIcon,
} from '@heroicons/react/24/outline';

import {
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  SpeakerWaveIcon as VolumeUpIcon,
} from '@heroicons/react/24/solid';
import {
  currentUserState,
  showFlashPremiumErrorState,
} from '../atoms/userAtom';
import { flash } from 'react-universal-flash';
import { debounce } from 'lodash';
import { isPremiumUser } from '../lib/checkPremiumUser';
import {
  adjustVolumeError,
  playPauseError,
  skipToNextError,
  skipToPreviousError,
} from '../lib/flashErrorMessages';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [showFlashPremiumError, setShowFlashPremiumError] = useRecoilState(
    showFlashPremiumErrorState
  );

  const currentUser = useRecoilValue(currentUserState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  async function fetchCurrentSong(): Promise<void> {
    // If there is no song playing initially
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing: ', data.body?.item);

        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // Fetch Song Info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  function isNonPremiumUser(errorType): void {
    if (!showFlashPremiumError) {
      console.log('Not premium user');
      // setShowFlashMessage(true);
      setShowFlashPremiumError(true);
      switch (errorType) {
        case 'play':
          playPauseError();
          break;
        case 'pause':
          playPauseError();
          break;
        case 'volume':
          adjustVolumeError();
          break;
        case 'skipToNext':
          skipToNextError();
          break;
        case 'skipToPrevious':
          skipToPreviousError();
          break;
        default:
          break;
      }
      // flash(
      //   10000,
      //   'premium',
      //   'Requires a Spotify Premium Account to play/pause & adjust volume of the songs'
      // );
      setTimeout(() => {
        // setShowFlashMessage(false);
        setShowFlashPremiumError(false);
      }, 10000);
    }
  }

  async function handlePlayPause(): Promise<void> {
    await spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  async function skipToNextTrack(): Promise<void> {
    await spotifyApi.skipToNext();
  }

  const debouncedAdjustVolume = useCallback(
    debounce(async (volume) => {
      await spotifyApi.setVolume(volume).catch((error) => {
        console.error('Set Volume Error', error);
      });
    }, 500),
    []
  );

  useEffect(() => {
    // isPremiumUser(
    //   currentUser,
    //   () => {
    //     if (volume > 0 && volume < 100) {
    //       debouncedAdjustVolume(volume);
    //     }
    //   },
    //   ()isNonPremiumUser('volume')
    // );
    if (
      Boolean(currentUser?.hasOwnProperty('product')) &&
      currentUser?.product === 'premium'
    ) {
      if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume);
      }
    } else {
      isNonPremiumUser('volume');
    }
  }, [volume]);

  return (
    <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left Side Section */}
      <div className="flex items-center space-x-4">
        <Image
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt="Song Image"
          width={40}
          height={40}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon
          className="button"
          onClick={() =>
            isPremiumUser(currentUser, skipToNextTrack, () =>
              isNonPremiumUser('skipToPrevious')
            )
          }
        />
        {isPlaying ? (
          <PauseCircleIcon
            onClick={() =>
              isPremiumUser(currentUser, handlePlayPause, () =>
                isNonPremiumUser('pause')
              )
            }
            className="button w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={() =>
              isPremiumUser(currentUser, handlePlayPause, () =>
                isNonPremiumUser('play')
              )
            }
            className="button w-10 h-10"
          />
        )}
        <ForwardIcon
          className="button"
          onClick={() =>
            isPremiumUser(currentUser, skipToNextTrack, () =>
              isNonPremiumUser('skipToNext')
            )
          }
        />
        <ArrowUturnLeftIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type={'range'}
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
