import { memo } from 'react';
import { RoundStartDrawer } from './Drawer';
import { RoundStartGuesser } from './Guesser';

const RoundStart = memo(function RoundStart() {
  const isDrawer = true

  if (!isDrawer) {
    return <RoundStartGuesser />
  }

  return (
    <RoundStartDrawer />
  )
});

export default RoundStart;
