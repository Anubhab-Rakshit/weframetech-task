/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT DIRECTLY. */
import React from 'react'
import configPromise from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise}>
    {children}
  </RootLayout>
)

export default Layout
