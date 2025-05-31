import { memo } from 'react';
import { RoundStartDrawer } from './Drawer';
import { RoundStartGuesser } from './Guesser';
import { useIsDrawer } from '../../../_state/hooks';

const RoundStart = memo(function RoundStart() {
  const isDrawer = useIsDrawer()

  if (!isDrawer) {
    return <RoundStartGuesser />
  }

  return (
    <RoundStartDrawer />
  )
});

export default RoundStart;
