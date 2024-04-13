import { ToastId, useToast } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

export const useApiStatusNotification = ({ isSuccess, isError }: { isSuccess: boolean; isError: boolean }) => {
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()

  useEffect(() => {
    if (isSuccess) {
      toastIdRef.current = toast({ title: 'Success', status: 'success', isClosable: true })
    } else if (isError) {
      toastIdRef.current = toast({ title: 'Success', status: 'success', isClosable: true })
    }
  }, [toast, isSuccess, isError])
}
