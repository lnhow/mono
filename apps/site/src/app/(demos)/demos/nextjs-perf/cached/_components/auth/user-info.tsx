'use client'
import { use } from 'react'
import { useAuth } from './provider'
import {
  LoginButton,
  UserInfo,
} from '../../../_components/child/layout/header/user-info/client'

export default function HeaderUserInfo() {
  const { user: userPromise } = useAuth()
  const user = use(userPromise)

  if (!user) {
    return <LoginButton />
  }
  return <UserInfo data={user} />
}
