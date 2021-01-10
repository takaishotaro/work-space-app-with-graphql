import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/AddPlan'

class AddPlan extends Component{
    constructor(props){
        super(props)
        this.state = {
            planName:'', 
            dynamicPricing:true,
            pricePerHour:'',
            maxPrice:'', 
            minHour:'',
            staticPrice:'',
        }
    }
    async onAddPlan(e){
        e.preventDefault()
        let {
            planName, dynamicPricing, pricePerHour, maxPrice, minHour, staticPrice
        } = this.state
        pricePerHour = parseInt(pricePerHour, 10)
        maxPrice = parseInt(maxPrice, 10)
        minHour = parseInt(minHour, 10)
        staticPrice = parseInt(staticPrice, 10)
        await this.props.mutate({
            variables: {
                planName, dynamicPricing, pricePerHour, maxPrice, minHour, staticPrice
            }
        }).then(()=>{
            this.props.router.push({
                pathname: "/plans"
            })
            alert('プランを追加しました。')
        }).catch((e)=> {
            throw new Error(e)
        })
    }
    render(){
        if(this.props.data.loading){ return <div>Loading...</div> }
        return(
            <div>
                <div className="space-middle"></div>
                <div className="button-right">
                    <h3>プランを追加</h3>
                        <div>
                            <button
                                className="waves-effect waves-light btn " 
                                style={{marginTop:28,marginRight:10}}
                                onClick={this.onAddPlan.bind(this)}
                            >
                                プランを追加
                            </button>
                        </div> 
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
                                    this.setState({pricePerHour: e.target.value})
                                }}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={this.state.minHour} 
                                onChange={(e)=>{
                                    this.setState({minHour: e.target.value})
                                }}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={this.state.maxPrice} 
                                onChange={(e)=>{
                                    this.setState({maxPrice: e.target.value})
                                }}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={this.state.staticPrice} 
                                onChange={(e)=>{
                                    e.target.value!=='-' && this.setState({staticPrice: e.target.value})
                                }}
                            />
                        </th>
                    </tr>
                </table>
            </div>
        )
    }
}

export default graphql(mutation)(AddPlan)