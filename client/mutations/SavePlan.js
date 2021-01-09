import gql from 'graphql-tag'

export default gql`
    mutation savePlan(
  	$id:ID,
  	$planName: String
    $dynamicPricing: Boolean
    $pricePerHour: Int
    $maxPrice: Int
    $minHour: Int
    $staticPrice: Int
){
  editPlan(
    id:$id,
    planName:$planName,
    dynamicPricing:$dynamicPricing,
    pricePerHour:$pricePerHour,
    minHour:$minHour,
    maxPrice:$maxPrice
    staticPrice:$staticPrice
  ){
    id
    planName
    dynamicPricing
    pricePerHour
    maxPrice
    minHour
    staticPrice
  }
}
`