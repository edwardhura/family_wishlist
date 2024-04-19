import { Center, Button, Text, TextProps } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

export const ExpandableText = ({
  limit = 150,
  textProps,
  children,
}: {
  textProps?: TextProps
  limit?: number
  children: string
}): React.JSX.Element => {
  const isExpandable = children.length > limit
  const [viewedText, setViewedText] = useState(isExpandable ? `${children.slice(0, limit)} ...` : children)
  const [expanded, setExpanded] = useState(false)

  const onExpandClickHandler = useCallback(() => {
    if (isExpandable) {
      expanded ? setViewedText(`${children.slice(0, limit)} ...`) : setViewedText(children)
      setExpanded(!expanded)
    }
  }, [isExpandable, children, limit, expanded])

  return (
    <Text {...textProps}>
      {viewedText}
      {isExpandable && (
        <>
          <br />
          <Center m="8px">
            <Button colorScheme="black" variant="link" size="md" onClick={onExpandClickHandler}>
              {expanded ? 'Show less' : 'Show more'}
            </Button>
          </Center>
        </>
      )}
    </Text>
  )
}
