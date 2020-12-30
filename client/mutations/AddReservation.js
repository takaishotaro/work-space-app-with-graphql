import gql from 'graphql-tag'

export default gql`
mutation AddReservation(
  	$email: String
    $name: String
    $phoneNumber: String
    $planId: ID
    $date: String
    $startAt: String
    $finishAt: String
    $totalPrice: Int
){
  addReservation(
    email: $email
    name: $name
    phoneNumber: $phoneNumber
    planId: $planId
    date: $date
    startAt: $startAt
    finishAt: $finishAt
    totalPrice: $totalPrice
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