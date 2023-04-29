Reflect.set(window, 'process', { env: { NODE_ENV: process.env.NODE_ENV } })
import * as ReactDOMClient from 'react-dom/client'
export function render(Comp: any) {
    const root = ReactDOMClient.createRoot(document.getElementById('app')!);
    root.render(Comp)
}