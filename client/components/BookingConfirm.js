import React, { Component } from 'react'
import { TotalPriceCulcurationForBooking } from '../utils/TotalPriceCulcuration'
import { graphql } from 'react-apollo'
import mutation from '../mutations/AddReservation'

class BookingConfirm extends Component{
    constructor(props){
        super(props)

        this.state = { 
            email: '',
            name: '',
            phoneNumber: '',
            plan: {},
            planIndex: 0,
            date: '',
            startAt: '',
            finishAt: '',
            totalPrice: 0,
        }
    }

    componentDidMount(){
            this.setState({
                email: this.props.location.state.email,
                name: this.props.location.state.name,
                phoneNumber: this.props.location.state.phoneNumber,
                plan: this.props.location.state.plan,
                date: this.props.location.state.date,
                startAt: this.props.location.state.startAt,
                finishAt: this.props.location.state.finishAt,
                totalPrice: TotalPriceCulcurationForBooking(
                    this.props.location.state.plan, 
                    this.props.location.state.startAt, 
                    this.props.location.state.finishAt
                )
            })
    }

    onSubmit(e){
        e.preventDefault()

        this.props.mutate({
            variables:{
                email: this.state.email, 
                name: this.state.name, 
                phoneNumber: this.state.phoneNumber, 
                planId: this.state.plan.id,
                date: this.state.date, 
                startAt: this.state.startAt,
                finishAt: this.state.finishAt,
                totalPrice: this.state.totalPrice
            }
        }).then(()=>{
            this.props.router.push({
                pathname: "/booking",
            })
            alert('予約をリクエストしました。承認に関してはメールでご連絡します。')
        }).catch((e)=> {
            throw new Error(e)
        })
    }
    
    render(){
        return (
            <div>
                <div className="space-middle"></div>
                <h3>予約内容確認</h3>
                <div className="row">
                    <table>
                        <tr>
                            <th>ご氏名</th>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <th>メールアドレス</th>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th>電話番号</th>
                            <td>{this.state.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>プラン</th>
                            <td>{this.state.plan.planName}</td>
                        </tr>
                        <tr>
                            <th>ご利用予定日</th>
                            <td>{this.state.date}</td>
                        </tr>
                        <tr>
                            <th>開始時刻</th>
                            <td>{this.state.startAt}</td>
                        </tr>
                        <tr>
                            <th>終了時刻</th>
                            <td>{this.state.finishAt}</td>
                        </tr>
                        <tr>
                            <th>合計金額</th>
                            <td>¥{this.state.totalPrice}</td>
                        </tr>
                    </table>
                    <div className="space-middle"></div>
                    <button className="btn" onClick={this.onSubmit.bind(this)}>予約をリクエスト</button>
                </div>
            </div>
        )
        
    }
}

export default graphql(mutation)(BookingConfirm)
