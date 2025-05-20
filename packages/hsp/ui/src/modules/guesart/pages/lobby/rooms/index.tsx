import { Button } from '@hsp/ui/src/components/base/button'

export default function Lobby() {
  return (
    <div className="flex flex-col gap-4">
      <Button className="w-96">Create Room</Button>
      <Button variant="outline" className="w-96">
        Join Room
      </Button>
    </div>
  )
}
