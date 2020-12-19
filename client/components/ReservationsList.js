import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchReservations'
import { Link } from 'react-router'

class ReservationsList extends Component {
    
    render(){
        if(this.props.data.loading){ return <div>Loading...</div>}
        
        return(
            <div>
                <div className="space-middle"></div>
                <h3 className="title">予約一覧</h3>
                <div className="space-middle"></div>
                <table className="nomal">
                    <thead>
                        <tr className="table-title">
                            <th>利用日</th>
                            <th>予約者名</th>
                            <th>利用開始</th>
                            <th>合計金額</th>
                            <th>利用ステータス</th>
                            <th>支払いステータス</th>
                            <th>詳細</th>
                        </tr>
                    </thead>

                    {this.props.data.reservations.map(reservation=>{
                        return(
                            <tr key={reservation.id}>
                                <th>{reservation.date}</th>
                                <th>{reservation.name}</th>
                                <th>{reservation.startAt.split(' ')[1]}</th>
                                <th>¥{reservation.totalPrice}</th>
                                <th>{reservation.usingStatus}</th>
                                {reservation.paymentStatus ? <th>支払済</th>:<th>未払い</th>}
                                <th><Link to={`/reservation/${reservation.id}`}><i className="material-icons">info</i></Link></th>
                            </tr>
                        )
                    })}
                    
                </table>
            </div>
        )
    }
}
export default graphql(query)(ReservationsList)