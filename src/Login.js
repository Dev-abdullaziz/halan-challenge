import { useState } from 'react'
import './css/login.css'
import { connect } from 'react-redux'
import { loginAction } from './actions/auth'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

function Login(props) {
    const [state,setState] = useState({
        username:'',
        password:'',
        loading: false,
        error: false
    })

    const {token} = props

    if(token) {
        return <Redirect to='/map'/>
    }

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        return response.json()
      }
      
    const updateValue = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    }

    const loading = () => {
        setState({
            ...state,
            loading: !state.loading,
            error: false
        })
    }

    const error = () => {
        setState({
            ...state,
            loading: false,
            error: !state.error
        })
    }

    const submit = (e) => {
        e.preventDefault()
        loading()
        postData('https://zones-backend-halan.herokuapp.com/login',{
            username: state.username,
            password: state.password
        }).then(
            data => {
                if(data.token) {
                    loading()
                    props.dispatch(loginAction(data.token))
                } else {
                    error()
                }
            }
        )
    }

    return (
        <div className='login'>
            <h1>Halan Challenge</h1>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' id='username' value={state.username} onChange={event => updateValue(event)}/>
                <label htmlFor='password'>password</label>
                <input type='password' name='password' id='password' value={state.password} onChange={event => updateValue(event)}/>
                {state.error ? <p>The Username or Password is Wrong</p> : null }
                {state.loading ? <Spinner animation='border' variant='info'/> : <button type='submit' onClick={submit}>Submit</button>}
            </form>
        </div>
    )
}

function mapStateToProps({token}){
    return {
        token
    }
}

export default connect(mapStateToProps)(Login)