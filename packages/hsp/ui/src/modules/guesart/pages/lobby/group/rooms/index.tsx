'use client'
import { memo, useState } from 'react'
import RoomCreateForm from './RoomCreateForm'
import RoomJoinForm from './RoomJoinForm'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@hsp/ui/src/components/base/tabs'
import { useSearchParams } from 'next/navigation'

const Lobby = memo(function Lobby() {
  const query = useSearchParams()
  const queryTab = query.get('tab')
  const [selectedTab, setSelectedTab] = useState<'join' | 'create'>(
    queryTab === 'create' ? 'create' : 'join',
  )

  const onTabChange = (tab: string) => {
    setSelectedTab(tab as 'join' | 'create')
    window.history.pushState(
      {},
      document.title,
      `${window.location.pathname}?tab=${tab}`,
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="flex min-h-10 border-base-100 border p-0">
          <TabsTrigger value="join" className="flex-1 min-h-10">
            Join Room
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-1 min-h-10">
            Create Room
          </TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <RoomJoinForm />
        </TabsContent>
        <TabsContent value="create">
          <RoomCreateForm />
        </TabsContent>
      </Tabs>
    </div>
  )
})

export default Lobby
