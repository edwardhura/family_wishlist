import React, { forwardRef } from 'react'
import {
  BreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbLinkProps,
} from '@chakra-ui/react'
import { useHref, useLinkClickHandler, LinkProps } from 'react-router-dom'

const BreadcrumbLink = forwardRef(function BreadcrumbLink(
  props: LinkProps & BreadcrumbLinkProps,
  ref,
): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { onClick, replace = false, state, target, to, ...rest } = props
  const href = useHref(to)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handleClick = useLinkClickHandler(to, { replace, state, target })

  return (
    <ChakraBreadcrumbLink
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          handleClick(event)
        }
      }}
      ref={ref}
      target={target}
    />
  )
})

interface BreadcrumbTree {
  path: string
  name: string
  current?: boolean
}

export const Breadcrumb: React.FC<{ tree: BreadcrumbTree[] }> = ({ tree }): React.JSX.Element => (
  <ChakraBreadcrumb>
    {tree.map(({ path, name, current }, index: number) => (
      <BreadcrumbItem key={`breadcrumb-link-${index}`}>
        <BreadcrumbLink fontWeight="bold" to={path} isCurrentPage={current}>
          {current ? `< ${name} >` : name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </ChakraBreadcrumb>
)
