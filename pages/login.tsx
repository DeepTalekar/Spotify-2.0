import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import SpotifyLogo from '../assets/images/Spotify_Icon_Green.png';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  providers: typeof getProviders;
}

const Login: NextPage<Props> = ({ providers }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-black min-h-screen w-full">
      <Image
        src={SpotifyLogo}
        alt="Spotify Logo"
        width={208}
        height={208}
        className="mb-5"
        priority
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={async () =>
              await signIn(provider.id, { callbackUrl: '/' })
            }
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
