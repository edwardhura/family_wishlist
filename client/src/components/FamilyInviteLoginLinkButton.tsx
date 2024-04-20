import { Button, ButtonProps } from '@chakra-ui/react'
import { useGenerateFamilyTokenMutation } from 'api/familiesApi'
import { useFetchUsersMeQuery } from 'api/usersApi'
import React, { useCallback, useEffect, useState } from 'react'
import getGoogleAuthUrl from 'utils/getGoogleAuthUrl'

export const FamilyInviteLoginLinkButton = (props: ButtonProps): React.JSX.Element | undefined => {
  const { data: userMe, isLoading: isPreloadingUser } = useFetchUsersMeQuery()
  const [generateToken, { data, isLoading, isSuccess, isError }] = useGenerateFamilyTokenMutation()
  const [buttonText, setButtonText] = useState('Generate Invite Link')

  const bgButtonProps = useCallback(() => {
    if (isSuccess) {
      return { bg: 'green.500' }
    }

    if (isError) {
      return { bg: 'red.500' }
    }

    return {}
  }, [isError, isSuccess])

  useEffect(() => {
    if (isSuccess && data?.inviteToken) {
      const copyToClipBoard = async (str: string): Promise<void> => {
        try {
          await navigator.clipboard.writeText(str)
          setButtonText('Copied!')
        } catch (e) {
          setButtonText('Error!')
          console.error(e)
        }
      }

      const loginUrlWithInvitation = getGoogleAuthUrl({ state: { familyInviteToken: data?.inviteToken } })
      void copyToClipBoard(loginUrlWithInvitation)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      setButtonText('Error!')
    }
  }, [isError])

  if (isPreloadingUser || !userMe?.familyUuid) return <></>

  const onClickHandler = (): void => {
    if (userMe.familyUuid) {
      void generateToken(userMe.familyUuid)
    }
  }

  return (
    <Button {...props} colorScheme="teal" isLoading={isLoading} onClick={onClickHandler} {...bgButtonProps()}>
      {buttonText}
    </Button>
  )
}
