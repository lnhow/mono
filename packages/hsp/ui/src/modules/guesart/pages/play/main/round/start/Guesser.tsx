import { memo, useMemo } from 'react';
import Container from '../../../_components/Container';
import { useAtomValue } from 'jotai';
import { roomPlayersAtom, roomRoundAtom } from '../../../_state/store';


export const RoundStartGuesser = memo(function RoundGuesser() {
  const { drawerId } = useAtomValue(roomRoundAtom)
  const players = useAtomValue(roomPlayersAtom)
  const drawerName = useMemo(() => {
    const drawer = players.find((val) => val.userId === drawerId)
    return drawer?.userName || 'N/A'
  }, [drawerId, players])

  return (
    <RoundStartGuesserInternal drawerName={drawerName} />
  )
})

interface RoundStartGuesserProps {
  drawerName: string;
}

export const RoundStartGuesserInternal = memo(function WaitingView({ drawerName }: RoundStartGuesserProps) {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-8 max-w-md w-full text-center">
        <h2 className="text-md font-bold text-fore-300">Drawer</h2>
        <div className="text-4xl font-bold text-fore-500 mb-8">{drawerName}</div>

        <p className="text-fore-300">Waiting for them to get ready<span className="animation-dots"></span></p>
      </div>
    </Container>
  );
});