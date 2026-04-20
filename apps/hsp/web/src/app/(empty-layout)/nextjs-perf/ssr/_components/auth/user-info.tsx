'use client'
import {
  LoginButton,
  UserInfo,
} from '../../../_components/child/layout/header/user-info/client'
import { useAuth } from './provider'

export default function HeaderUserInfo() {
  const { user } = useAuth()

  if (!user) {
    return <LoginButton />
  }
  return <UserInfo data={user} />
}
