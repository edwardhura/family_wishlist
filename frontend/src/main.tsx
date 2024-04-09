import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { GlobalLoader } from 'components'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { rootApi } from 'rootApi'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'white',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        fontWeight: 'bold',
        color: 'teal.500',
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ApiProvider api={rootApi}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={<GlobalLoader />} />
      </ChakraProvider>
    </ApiProvider>
  </React.StrictMode>,
)
