import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
Reflect.set(window, 'process', { env: { NODE_ENV: process.env.NODE_ENV } })
import { Layout } from '@imeepos/admin-pro'
async function bootstrap() {
    const root = ReactDOMClient.createRoot(document.getElementById('app')!);
    root.render(<Layout />)
}
bootstrap();