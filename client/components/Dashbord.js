import React,{ Component } from 'react'

class Dashbord extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <div className="space-middle"></div>
                <h3>Home</h3>
                <div className="space-middle"></div>
                    <button
                        className="waves-effect waves-light btn " 
                        style={{marginTop:28,marginRight:10}}
                        onClick={()=>{
                            this.props.router.push({
                                pathname: "/reservations",
                            })
                        }}
                    >
                        予約一覧
                    </button>
                    <button
                        className="waves-effect waves-light btn " 
                        style={{marginTop:28,marginRight:10}}
                        onClick={()=>{
                            this.props.router.push({
                                pathname: "/plans",
                            })
                        }}
                    >
                        プラン一覧
                    </button>
                    <button
                        className="waves-effect waves-light btn " 
                        style={{marginTop:28,marginRight:10}}
                        onClick={()=>{
                            this.props.router.push({
                                pathname: "/addPlan",
                            })
                        }}
                    >
                        プランを作成
                    </button>
            </div>
        )
    }
}
export default Dashbord