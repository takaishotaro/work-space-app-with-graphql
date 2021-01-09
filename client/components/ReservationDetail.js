import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchReservationDetail'
import mutation from '../mutations/EditReservation'

class ReservationsDeatil extends Component {
    onApproved(id,approval,usingStatus,paymentStatus){
        this.props.mutate({ variables: { id, approval:"Approved", usingStatus, paymentStatus } })
            .then(() => this.props.data.refetch())
    }
    onRejected(id,approval,usingStatus,paymentStatus){
        this.props.mutate({ variables: { id, approval:"Rejected", usingStatus, paymentStatus } })
            .then(() => this.props.data.refetch())
    }
    onUsing(id,approval,usingStatus,paymentStatus){
        this.props.mutate({ variables: { id, approval, usingStatus:"using", paymentStatus } })
            .then(() => this.props.data.refetch())
    }
    onFinished(id,approval,usingStatus,paymentStatus){
        this.props.mutate({ variables: { id, approval, usingStatus:"finished", paymentStatus } })
            .then(() => this.props.data.refetch())
    }
    onPayment(id,approval,usingStatus,paymentStatus){
        this.props.mutate({ variables: { id, approval, usingStatus, paymentStatus: true } })
            .then(() => this.props.data.refetch())
    }
    renderUsingStatusButton(id,approval,usingStatus,paymentStatus){
        if(usingStatus=="notArrived"){
            return (
                <td>
                    <button 
                            className="waves-effect waves-light btn"
                            disabled={approval !== 'Approved'}
                            onClick={() => this.onUsing(id,approval,usingStatus,paymentStatus)}
                    >
                        「使用中」に変更
                    </button>
                </td>
            )
        } else if(usingStatus=="using"){
            return (
                <td>
                    <button 
                            className="waves-effect waves-light btn"
                            disabled={approval !== 'Approved'}
                            onClick={() => this.onFinished(id,approval,usingStatus,paymentStatus)}
                    >
                        「終了」に変更
                    </button>
                </td>
            )
        } else {
            return <div></div>
        }
    }
    render(){
        if(this.props.data.loading){ return <div>Loading...</div>}
        const { 
            id,email,name,phoneNumber,plan,date,startAt,finishAt,totalPrice,
            paymentStatus,usingStatus,approval,createdAt,updatedAt
        } = this.props.data.reservation
        return(
            <div>
                <div className="space-middle"></div>
                <h3 className="title">{name}様のご予約</h3>
                <div className="space-middle"></div>
                <table className="nomal">
                    <tr className="table-title">
                        <th>利用日</th>
                        <th>利用開始</th>
                        <th>利用終了</th>
                        <th>プラン</th>
                        <th>合計金額</th>
                    </tr>
                    
                    <tr>
                        <th>{date}</th>
                        <th>{startAt.split(' ')[1]}</th>
                        <th>{finishAt.split(' ')[1]}</th>
                        <th>{plan.planName}</th>
                        <th>¥{totalPrice}</th>
                    </tr>

                    <div className="space-middle"></div>

                    <tr className="table-title">
                        <th>メールアドレス</th>
                        <th>電話番号</th>
                        <th>予約日時</th>
                        <th>最終更新</th>
                    </tr>

                    <tr>
                        <th>{email}</th>
                        <th>{phoneNumber}</th>
                        <th>{createdAt}</th>
                        <th>{finishAt}</th>
                    </tr>                    
                </table>

                <div className="space-middle"></div>

                <table className="status">
                    <tr>
                        <th>承認ステータス</th>
                        {approval=="Pending" && <td>承認待ち</td>}
                        {approval=="Approved" && <td>承認済み</td>}
                        {approval=="Rejected" && <td>却下済み</td>}
                        <td>
                            <button 
                                className="waves-effect waves-light btn button-margin-right" 
                                onClick={() => this.onApproved(id,approval,usingStatus,paymentStatus)}
                                disabled={approval=="Approved"||approval=="Rejected"}
                            >
                                予約を承認
                            </button>
                            <button 
                                className="waves-effect waves-light btn"
                                onClick={() => this.onRejected(id,approval,usingStatus,paymentStatus)}
                                disabled={approval=="Approved"||approval=="Rejected"}
                            >
                                予約を却下
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <th>利用ステータス</th>
                        {usingStatus=="notArrived" && <td>未到着</td>}
                        {usingStatus=="using" && <td>使用中</td>}
                        {usingStatus=="finished" && <td>終了</td>}
                        {this.renderUsingStatusButton(id,approval,usingStatus,paymentStatus)}
                    </tr>

                    <tr>
                        <th>支払いステータス</th>
                        {paymentStatus ? <td>支払い済</td>:<td>未払い</td>}
                        <td>
                            <button 
                                className="waves-effect waves-light btn"
                                disabled={approval !== 'Approved' || paymentStatus}
                                onClick={() => this.onPayment(id,approval,usingStatus,paymentStatus)}
                            >
                                合計金額¥{totalPrice}を会計
                            </button>
                        </td>
                    </tr>
                </table>

                <div className="space-middle"></div>

            </div>
        )
    }
}
export default graphql(mutation)(
    graphql(query,{
        options: (props) => { return { variables: { id: props.params.id }}}
    })(ReservationsDeatil)
)
