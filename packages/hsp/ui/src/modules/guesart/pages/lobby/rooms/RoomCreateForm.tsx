'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Card } from '@hsp/ui/src/components/base/card'
import { Input } from '@hsp/ui/src/components/base/input'
import { Button } from '@hsp/ui/src/components/base/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@hsp/ui/src/components/base/select'

interface RoomFormValues {
  name: string
  theme: string
  maxUsers: number
  rounds: number
  roundTime: string
}

const themes = ['Animals', 'Movies', 'Technology', 'Nature', 'Space', 'Fantasy']
const maxUsersOptions = Array.from({ length: 7 }, (_, i) => i + 2)
const roundsOptions = Array.from({ length: 8 }, (_, i) => i + 3)
const roundTimeOptions = ['30s', '45s', '1m']

export default function RoomCreateForm() {
  const { register, handleSubmit, reset } = useForm<RoomFormValues>()

  const onSubmit: SubmitHandler<RoomFormValues> = (data) => {
    console.log('Room Created:', data)
    reset()
  }

  return (
    <Card className="p-6 w-96 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Room Name"
          {...register('name', { required: true })}
          className="w-full"
        />
        <Select {...register('theme', { required: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          {...register('maxUsers', { required: true, valueAsNumber: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Max Users" />
          </SelectTrigger>
          <SelectContent>
            {maxUsersOptions.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          {...register('rounds', { required: true, valueAsNumber: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rounds" />
          </SelectTrigger>
          <SelectContent>
            {roundsOptions.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select {...register('roundTime', { required: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Time per Round" />
          </SelectTrigger>
          <SelectContent>
            {roundTimeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full">
          Create Room
        </Button>
      </form>
    </Card>
  )
}
