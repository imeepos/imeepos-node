import { ModalProps } from 'antd'
import { useState } from 'react'
import { useForm } from './useForm'

export function sueModal() {
    const [open, setOpen] = useState(false)
    const { formProps } = useForm({})
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const modalProps: ModalProps = {
        open: open,
        onOk(e) {
            
        }
    }
    return { modalProps, formProps }
}