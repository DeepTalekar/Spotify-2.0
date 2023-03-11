import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import { flash } from 'react-universal-flash';

import Song from './Song';
import { showFlashPremiumErrorState } from '../atoms/userAtom';
import { playSongError } from '../lib/flashErrorMessages';

const Songs = (props) => {
  const playlist = useRecoilValue(playlistState);
  const [showFlashMessage, setShowFlashMessage] = useState(false);

  const [showFlashPremiumError, setShowFlashPremiumError] = useRecoilState(
    showFlashPremiumErrorState
  );

  function isNonPremiumUser() {
    if (!showFlashPremiumError) {
      console.log('Not premium user');
      // setShowFlashMessage(true);
      setShowFlashPremiumError(true);
      playSongError();
      setTimeout(() => {
        // setShowFlashMessage(false);
        setShowFlashPremiumError(false);
      }, 10000);
    }
  }

  return (
    <div className="flex flex-col space-y-1 text-white px-8 pb-28">
      {playlist?.tracks.items.map((track, i) => (
        <Song
          key={track.track.id}
          track={track}
          order={i}
          isNonPremiumUser={isNonPremiumUser}
        />
      ))}
    </div>
  );
};

export default Songs;
