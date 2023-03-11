import { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';

import useSpotify from '../hooks/useSpotify';
import {
  currentUserState,
  showFlashPremiumErrorState,
} from '../atoms/userAtom';

import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';

const Home: NextPage = () => {
  const spotifyApi = useSpotify();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    async function fetchCurrentUser() {
      const user = await spotifyApi
        .getMe()
        .then((data) => data.body)
        .catch((error) =>
          console.error('Error while fetching current User: ', error)
        );

      console.log('Current User: ', user);
      setCurrentUser(user);
    }

    fetchCurrentUser();
  }, []);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>

      <section className="sticky bottom-0">
        {/* Player */}
        <Player />
      </section>
    </div>
  );
};

export async function getServerSideProps(context): GetServerSideProps {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
