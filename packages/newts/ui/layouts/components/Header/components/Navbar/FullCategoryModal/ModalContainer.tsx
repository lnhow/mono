'use client'
import { Close, Menu } from '@mui/icons-material'
import { MouseEventHandler, PropsWithChildren, memo, useCallback, useRef } from 'react'

const ModalContainer = memo(function ModalContainer({
  children,
}: PropsWithChildren) {
  const refModal = useRef<HTMLDialogElement>(null)

  const handleClose = useCallback(() => {
    refModal.current?.close()
  }, [])
  const handleOpen = useCallback(() => {
    refModal.current?.showModal()
  }, [])

  // const handleClose = useCallback(() => setOpen(false), [])
  const handleLinkClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      // setOpen(false)
      handleClose()
    }
  }, [handleClose])

  return (
    <>
      <button className='btn btn-square btn-ghost' onClick={handleOpen}>
        <Menu />
      </button>
      <dialog ref={refModal} className='modal modal-top'>
        <div className='modal-box pt-0'>
          <div className='flex py-2'>
            <button className='btn btn-circle btn-ghost' onClick={handleClose}>
              <Close />
            </button>
          </div>
          <div onClick={handleLinkClick}>
            {children}
          </div>
        </div>
        <div className='modal-backdrop' onClick={handleClose}></div>
      </dialog>
    </>
  )
})

export default ModalContainer
