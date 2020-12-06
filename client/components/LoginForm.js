import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/Login'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
    constructor(props){
        super(props)

        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps){
        //old, cerrent set of props
        // the next set of props that will be in place
        //when the component rerenders
        if(!this.props.data.user && nextProps.data.user){
            //redirect to dashbord!!
            hashHistory.push('/dashbord')
        }
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .then(() => router.push('/dashbord'))
        .catch(res => { 
            const errors = res.graphQLErrors.map( error => error.message )
            this.setState({ errors })
        })
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}
export default graphql(query)(
    graphql(mutation)(LoginForm)
)
    