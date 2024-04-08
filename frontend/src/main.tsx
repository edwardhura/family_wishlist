import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { rootApi } from './rootApi'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

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
        <RouterProvider router={Router} />
      </ChakraProvider>
    </ApiProvider>
  </React.StrictMode>,
)
