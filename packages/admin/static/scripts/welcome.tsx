import * as React from 'react'
import { render } from './components/utils'
export const Welcome = () => {
    return <div className="page welcome-page">
        <div className="page-sider">
            
        </div>
        <div className="page-container">
            <div className="page-header"></div>
            <div className="page-footer"></div>
        </div>
    </div>
}
render(<Welcome />)
