import { memo } from 'react'

import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { Card } from '@hsp/ui/components/card'
import { FormGroup } from './group'

function PageLobby() {
  return (
    <div className="max-w-2xl mx-auto min-h-(--layout-full-height) flex flex-col justify-center">
      <ViewTransition name="guesart-card">
        <Card className="p-6 shadow-md max-w-sm w-full mx-auto">
          <ViewTransition name="guesart-title">
            <h1 className="text-2xl text-center font-semibold mb-4">guesart</h1>
          </ViewTransition>
          <FormGroup />
        </Card>
      </ViewTransition>
    </div>
  )
}
export default memo(PageLobby)
