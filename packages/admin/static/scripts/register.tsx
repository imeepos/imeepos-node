import * as React from 'react'
import { render } from './components/utils'
export const Register = () => {
    return <div className="register-page">
        <div className="register-form">
            <div className="form-item"><input type="text" /></div>
            <div className="form-item"><input type="password" /></div>
            <div className="form-item"><input type="repassword" /></div>
            <div className="form-item"><button>注册</button></div>
            <div className="form-item"><a href="login.html">已有账号去登录</a></div>
        </div>
    </div>
}
render(<Register />)
