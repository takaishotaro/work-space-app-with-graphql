import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import fetchPlans from '../queries/fetchPlans'
import Select from 'react-select'

class Booking extends Component {
    constructor(props){
        super(props)

        this.state = { 
            email: '',
            name: '',
            phoneNumber: '',
            plan: {},
            date: '',
            startAt: '',
            finishAt: '',
            totalPrice: 0,
            errors: [],
            radio: "a",
            text: ""
        }
    }

    render(){
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
        console.log(this.props.data)
        if(this.props.data.loading){ return <div>Loading...</div>}
        return(
            <div>
                <h3>Booking</h3>
                <div className="row">
                <form className="col s4">
                    <div className="input-field">
                        <input
                            placeholder="氏名"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    
                    {/* <div className="errors">
                        {this.props.errors.map(error => <div key={error}>{error}</div>)}
                    </div> */}
                    <button className="btn">Submit</button>
                </form>
            </div>
            </div>
        )
    }
}
export default graphql(fetchPlans)(Booking)