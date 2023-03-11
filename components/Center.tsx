import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil';

import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
import UserIcon from '../assets/UserIcon';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-purple-500',
];

const blurPlaylistImageColor = [
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMTvu/HwAFhQKJv6UEWAAAAABJRU5ErkJggg==',
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0bvq2HwAFJwJ0fg0IdAAAAABJRU5ErkJggg==',
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUOhq3HwAEXAIGHeXLbgAAAABJRU5ErkJggg==',
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN87+KyHwAF2QI4/2oPwQAAAABJRU5ErkJggg==',
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8tZljPwAGmgJmD46krAAAAABJRU5ErkJggg==',
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcEfp9PwAGVgK1F3HYHQAAAABJRU5ErkJggg==',
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyApi = useSpotify();

  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    async function fetchPlaylistData() {
      await spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) =>
          console.log(
            'Something went wrong when fetching Playlists Data! ',
            err
          )
        );
    }

    fetchPlaylistData();
  }, [spotifyApi, playlistId, session]);

  console.log('Session: ', session?.user);
  console.log('Playlist Data: ', playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-[#0a0a0a] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={async () => await signOut()}
        >
          {session?.user?.image ? (
            <Image
              placeholder="blur"
              priority={true}
              blurDataURL={shuffle(blurPlaylistImageColor).pop()}
              className="rounded-full w-10 h-10"
              src={session?.user?.image}
              alt="Profile Picture"
              width={40}
              height={40}
            />
          ) : (
            <div className="flex w-10 h-10 items-center justify-center rounded-full bg-[#535353]">
              <UserIcon width={20} height={20} fill="#000000" />
            </div>
          )}
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <Image
          src={playlist?.images?.[0].url}
          alt="Playlist image"
          width={176}
          height={176}
          className="w-44 h-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      {/* Songs */}
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
