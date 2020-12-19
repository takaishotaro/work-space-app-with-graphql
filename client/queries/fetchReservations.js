import gql from 'graphql-tag'

export default gql`
    {
        reservations{
            id
            date
            name
            startAt
            totalPrice
            usingStatus
            paymentStatus
        }
    }
`