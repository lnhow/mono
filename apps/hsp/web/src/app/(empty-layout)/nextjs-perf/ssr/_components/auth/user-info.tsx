'use client'
import { useAuth } from './provider'
import {
  LoginButton,
  UserInfo,
} from '../../../_components/child/layout/header/user-info/client'

export default function HeaderUserInfo() {
  const { user } = useAuth()

  if (!user) {
    return <LoginButton />
  }
  return <UserInfo data={user} />
}
