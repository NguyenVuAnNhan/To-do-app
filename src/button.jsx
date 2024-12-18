import './App.css'

function Button({onPress, children}){
    return(<button onClick={onPress}>{children}</button>)
}

export default Button