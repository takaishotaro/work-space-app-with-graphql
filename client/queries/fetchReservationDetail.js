import gql from 'graphql-tag'

export default gql`
    query fetchReservationDetail($id:ID){
        reservation(id:$id){
            id
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
            paymentStatus
            usingStatus
            approval
            createdAt
            updatedAt
        }
    }
`