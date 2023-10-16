'use client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Close, Menu } from '@mui/icons-material'
import React, { MouseEventHandler, PropsWithChildren, memo, useCallback, useState } from 'react'

const ModalContainer = memo(function ModalContainer({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  )

  const handleClose = useCallback(() => setOpen(false), [])
  const handleLinkClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      setOpen(false)
    }
  }, [])

  return (
    <>
      <IconButton
        className="rounded [&_.MuiTouchRipple-root_.MuiTouchRipple-child]:rounded text-black dark:text-white"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
        scroll="paper"
        TransitionComponent={Slide}
        className="
          [&_.MuiDialog-container]:items-start
          [&_.MuiPaper-root]:max-h-[80vh]
          [&_.MuiPaper-root]:rounded-b-xl 
          [&_.MuiPaper-root]:md:rounded-xl 
        "
      >
        <DialogTitle className="flex justify-end px-4 py-2">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className='mb-4' onClick={handleLinkClick}>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
})

export default ModalContainer
