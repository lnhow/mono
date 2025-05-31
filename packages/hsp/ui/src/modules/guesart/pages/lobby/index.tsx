import { memo } from 'react'

import { Card } from '@hsp/ui/src/components/base/card'
import { FormGroup } from './group'

function PageLobby() {
  return (
    <div className="max-w-2xl mx-auto min-h-(--layout-full-height) flex flex-col justify-center">
      <Card className="p-6 shadow-md max-w-sm w-full mx-auto">
        <h1 className="text-2xl text-center font-semibold mb-4">guesart</h1>
        <FormGroup />
      </Card>
    </div>
  )
}
export default memo(PageLobby)
