import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import fetchPlans from '../queries/fetchPlans'
import { TotalPriceCulcurationForBooking } from '../utils/TotalPriceCulcuration'
import { isBefore, isAfter } from 'validator'

class Booking extends Component {
    constructor(props){
        super(props)

        this.state = { 
            email: '',
            name: '',
            phoneNumber: '',
            plan: {},
            planIndex: NaN,
            date: '',
            startAt: '',
            finishAt: '',
            totalPrice: null,
        }
    }

    onToConfirm(e){
        e.preventDefault()

        const businessHour = (time) => {
            if(
                isAfter(`2020-12-25 ${time}`, `2020-12-25 08:00`) 
                && isBefore(`2020-12-25 ${time}`, `2020-12-25 22:00`)
            ){ return true } else { return false }
        }

        if(!isBefore(`2020-12-25 ${this.state.startAt}`, `2020-12-25 ${this.state.finishAt}`)){
            return alert('ご利用時間を正しくご入力ください。')
        }

        if(!businessHour(this.state.startAt) || !businessHour(this.state.finishAt)){
            return alert('営業時間外です。')
        }

        if(
            this.state.email==='', this.state.name==='', this.state.phoneNumber==='',
            this.state.plan==={}, this.state.date==='', this.state.startAt==='', this.state.finishAt===''
        ){
            return alert('必須項目が未入力です。')
        }
        
        this.props.router.push({
            pathname: "/booking/confirm",
            state: this.state
        })
    }

    totalPriceCulcurate(e){
        e.preventDefault()

        if(this.state.planIndex+1>this.props.data.plans.length){
            return alert('プランを正しくご入力ください')
        } 
        this.setState({
            totalPrice: TotalPriceCulcurationForBooking(this.state.plan, this.state.startAt, this.state.finishAt)
        })
    }

    render(){
        console.log(this.props.data)
        if(this.props.data.loading){ return <div>Loading...</div>}
        return(
            <div>
            <div className="space-middle"></div>
            <h3>Booking</h3>
            <div className="row">
            <form className="col">
                <p>ご氏名</p>
                <input 
                    type="text"
                    value={this.state.name} 
                    onChange={(e)=>this.setState({name: e.target.value})}
                />
    
                <div className="space-small"></div>
                <p>メールアドレス</p>
                <input 
                    type="email" 
                    value={this.state.email} 
                    onChange={(e)=>this.setState({email: e.target.value})}
                />
    
                <div className="space-small"></div>
                <p>電話番号</p>
                <input 
                    type="text" 
                    value={this.state.phoneNumber} 
                    onChange={(e)=>this.setState({phoneNumber: e.target.value})}
                />
    
                <div className="space-small"></div>
                <p>ご利用予定日</p>
                <input 
                    type="date" 
                    value={this.state.date} 
                    onChange={(e)=>this.setState({date: e.target.value})}
                />
    
                <div className="space-middle"></div>
                
                <table className="nomal">
                    <thead>
                        <tr className="table-title">
                            <th>プラン番号</th>
                            <th>プラン名</th>
                            <th>1時間あたりの料金</th>
                            <th>最小料金</th>
                            <th>最大料金</th>
                            <th>固定料金</th>
                        </tr>
                    </thead>
    
                    {this.props.data.plans.map((plan,index)=>{
                        return(
                            <tr key={index}>
                                <th>{index+1}</th>
                                <th>{plan.planName}</th>
                                <th>¥{plan.pricePerHour}</th>
                                <th>¥{plan.minHour*plan.pricePerHour}~</th>
                                <th>~¥{plan.maxPrice}</th>
                                <th>{plan.staticPrice ? `¥${plan.staticPrice}`:'-'}</th>
                            </tr>
                        )
                    })}
                </table>
    
                <p>希望のプランの番号をご入力ください。</p>
                <input 
                    type="number"
                    value={this.state.planIndex+1} 
                    onChange={(e)=>{
                        this.setState({planIndex: e.target.value-1})
                        this.setState({plan: this.props.data.plans[e.target.value-1]})
                    }}
                />
    
                <div className="space-small"></div>
                <p>利用開始時刻</p>
                <input 
                    type="time" 
                    value={this.state.startAt}
                    onChange={(e)=>this.setState({startAt:e.target.value})}
                />
    
                <div className="space-small"></div>
                <p>利用終了時刻</p>
                <input 
                    type="time" 
                    value={this.state.finishAt}
                    onChange={(e)=>this.setState({finishAt:e.target.value})}
                />
    
                <div className="space-small"></div>
                <button onClick={this.totalPriceCulcurate.bind(this)}>合計金額を計算</button>
                <p>合計金額 : ¥{this.state.totalPrice}</p>

                <div className="space-small"></div>
    
                <button className="btn" onClick={this.onToConfirm.bind(this)}>確認画面へ</button>
            </form>
        </div>
        </div>
        )
    }
}
export default graphql(fetchPlans)(Booking)