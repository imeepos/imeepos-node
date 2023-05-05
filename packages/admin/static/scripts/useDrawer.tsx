import { DrawerProps } from 'antd'
import { useState } from 'react'
export function useDrawer({ title }: { title: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const drawerProps: DrawerProps = {
        open: open,
        title: title,
        onClose: onClose
    }
    return { drawerProps, onOpen, onClose }
}