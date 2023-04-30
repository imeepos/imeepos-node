import * as React from 'react'
import { render } from './components/utils'
export const Login = () => {
    return <div className="page login-page">
        <div className="login-form">
            <div className="form-item"><input type="text" /></div>
            <div className="form-item"><input type="password" /></div>
            <div className="form-item"><button>登录</button></div>
            <div className="form-item"><a href="register.html">还没有账号，去注册</a></div>
        </div>
    </div>
}
render(<Login />)