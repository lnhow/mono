'use client'
import { Dialog, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import React, { PropsWithChildren, memo, useState } from 'react'

const ModalContainer = memo(function ModalContainer({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <IconButton className="rounded" onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {children}
      </Dialog>
    </>
  )
})

export default ModalContainer
