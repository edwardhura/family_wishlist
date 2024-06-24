import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { WishForm } from '../form'
import { Breadcrumb } from 'components'

export const Page = (): JSX.Element => {
  const { uuid } = useParams()

  return (
    <>
      <Breadcrumb
        tree={[
          { path: '/wishes', name: 'Board' },
          { path: `/wishes/${uuid}/edit`, name: 'Edit', current: true },
        ]}
      />
      <Heading padding="1em 0 2em" size="xl">
        Edit wish
      </Heading>
      <WishForm uuid={uuid} />
    </>
  )
}
