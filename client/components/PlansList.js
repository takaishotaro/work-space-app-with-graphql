import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchPlans'
import { Link } from 'react-router'

class PlansList extends Component {
    constructor(props){
        super(props)
    }
    
    onEdit(e){
        e.preventDefault()
        this.setState({isEdit: ture})
    }
    render(){
        if(this.props.data.loading){ return <div>Loading...</div>}
        return(
            <div>
                {()=>{
                    this.setState({plans: this.props.data.plans})
                    
                    }
                }
                <div className="space-middle"></div>
                <h3 className="title">プラン一覧</h3>
                <div className="space-middle"></div>
                <table className="nomal">
                     <thead>
                        <tr className="table-title">
                            <th>プラン名</th>
                            <th>1時間あたりの価格変動</th>
                            <th>1時間あたりの料金</th>
                            <th>最小料金</th>
                            <th>最大料金</th>
                            <th>固定料金</th>
                            <th>編集</th>
                        </tr>
                    </thead>

                    {this.props.data.plans.map((plan,index)=>{
                            return(                              
                                <tr key={index}>
                                    <th>{plan.planName}</th>
                                    <th>{plan.dynamicPricing ? "有効":"無効"}</th>
                                    <th>¥{plan.pricePerHour}</th>
                                    <th>¥{plan.minHour*plan.pricePerHour}~</th>
                                    <th>~¥{plan.maxPrice}</th>
                                    <th>{plan.staticPrice ? `¥${plan.staticPrice}`:'-'}</th>
                                    <th><Link to={`/plan/${plan.id}`}><i className="material-icons">info</i></Link></th>
                                </tr>
                            )
                        }
                    )}
                    
                </table>
            </div>
        )
    }
}

export default graphql(query)(PlansList)
