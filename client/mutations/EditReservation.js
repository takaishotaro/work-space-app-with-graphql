import gql from 'graphql-tag'

export default gql`
    mutation UpdateReservation($id:ID,$usingStatus:UsingStatusType,$paymentStatus:Boolean,$approval:ApprovalType){
        editReservation(id:$id, usingStatus:$usingStatus, paymentStatus: $paymentStatus, approval:$approval
        ){
            name
        }
    }
`