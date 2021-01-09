import React, { Component } from 'react'
import query from '../queries/fetchPlanDetail'
import { graphql } from 'react-apollo'
import mutation from '../mutations/SavePlan'

class PlanEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            planName:'', 
            dynamicPricing:true,
            pricePerHour:0,
            maxPrice:0, 
            minHour:0,
            staticPrice:0,
            isEdit: false,
        }
    }
    componentDidUpdate(){
        console.log(this.props)
    }
    async onSave(e){
        e.preventDefault()

        const {
            planName, dynamicPricing, pricePerHour, maxPrice, minHour, staticPrice
        } = this.state

        this.props.mutate({ variables: {
            id: this.props.params.id,
            planName, dynamicPricing, pricePerHour, maxPrice, minHour, staticPrice
        }}).then(() => {
            this.props.data.refetch()
            this.setState({isEdit:false})
        })
    }
    onEditCancel(e){
        e.preventDefault()

        this.setState({
            planName:'', 
            dynamicPricing:true,
            pricePerHour:0,
            maxPrice:0, 
            minHour:0,
            staticPrice:0,
            isEdit: false,
        })
    }
    async onEdit(e){
        e.preventDefault()

        const { 
            planName, dynamicPricing,
            pricePerHour,maxPrice, minHour,staticPrice
        } = this.props.data.plan

        await this.setState({
            isEdit: true,
            planName, dynamicPricing,
            pricePerHour,maxPrice, minHour,staticPrice
        })
    }
    render(){
        if(this.props.data.loading){ return <div>Loading...</div> }
        const { 
            planName, dynamicPricing,
            pricePerHour,maxPrice, minHour,staticPrice
        } = this.props.data.plan
        
        return(
            <div>
                <div className="space-middle"></div>
                <div className="button-right">
                    <h3>「{planName}」の詳細</h3>
                    {this.state.isEdit ? (
                        <div>
                            <button
                                className="waves-effect waves-light btn " 
                                style={{marginTop:28,marginRight:10}}
                                onClick={this.onSave.bind(this)}
                            >
                                プラン内容を更新
                            </button>

                            <button
                                className="waves-effect waves-light btn " 
                                style={{marginTop:28}}
                                onClick={this.onEditCancel.bind(this)}
                            >
                                破棄
                            </button>
                        </div> 
                    ):(
                        <button
                            className="waves-effect waves-light btn " 
                            style={{marginTop:28}}
                            onClick={this.onEdit.bind(this)}
                        >
                            編集
                        </button>
                    ) }
                </div>
                <div className="space-middle"></div>
                <table className="nomal">
                    <tr className="table-title">
                        <th>プラン名</th>
                        <th>1時間あたりの価格変動</th>
                        <th>1時間あたりの料金</th>
                        <th>最小利用時間</th>
                        <th>最大料金</th>
                        <th>固定料金</th>
                    </tr>
                    
                    <tr>
                        <th>{planName}</th>
                        <th>{dynamicPricing ? "有効":"無効"}</th>
                        <th>¥{pricePerHour}</th>
                        <th>{minHour}h~</th>
                        <th>~¥{maxPrice}</th>
                        <th>{staticPrice ? `¥${staticPrice}`:'-'}</th>
                    </tr>

                    {this.state.isEdit && (
                        <tr>
                            <th>
                                <input
                                    type="text"
                                    value={this.state.planName} 
                                    onChange={(e)=>{
                                        this.setState({planName: e.target.value})
                                    }}
                                />
                            </th>
                            <th>
                                <p>1,有効　2,無効</p>
                                <input
                                    type="number"
                                    value={this.state.dynamicPricing ? 1 : 2} 
                                    onChange={(e)=>{
                                        e.target.value == 1 && this.setState({dynamicPricing: true})
                                        e.target.value == 2 && this.setState({dynamicPricing: false})
                                    }}
                                    style={{textAlign:"center"}}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={this.state.pricePerHour} 
                                    onChange={(e)=>{
                                        this.setState({planName: parseInt(e.target.value, 10)})
                                    }}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={this.state.minHour} 
                                    onChange={(e)=>{
                                        this.setState({minHour: parseInt(e.target.value, 10)})
                                    }}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={this.state.maxPrice} 
                                    onChange={(e)=>{
                                        this.setState({maxPrice: parseInt(e.target.value, 10)})
                                    }}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={this.state.staticPrice} 
                                    onChange={(e)=>{
                                        e.target.value!=='-' && this.setState({staticPrice: parseInt(e.target.value, 10)})
                                    }}
                                />
                            </th>
                        </tr>
                    )}
                </table>
            </div>
        )
    }
}

export default graphql(mutation)(
    graphql(query,{
        options: (props) => { return { variables: { id: props.params.id }}}
})(PlanEdit))