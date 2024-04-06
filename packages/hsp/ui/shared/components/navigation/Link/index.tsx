import Link from 'next/link'
import type { LinkProps as BaseLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export type LinkProps = PropsWithChildren<BaseLinkProps>

export default Link
