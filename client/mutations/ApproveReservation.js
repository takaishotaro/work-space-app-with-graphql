import gql from 'graphql-tag'

export default gql`
    mutation ApproveReservation(
        $id:ID
    ){
    approveReservation(
        id:$id,
        approval:Approved
    ){
        email
        name
        phoneNumber
        plan{
        planName
        }
        date
        startAt
        finishAt
        totalPrice
    }
}
`