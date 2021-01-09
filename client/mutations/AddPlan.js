import gql from 'graphql-tag'

export default gql`
    mutation AddPlan(
        $planName: String
        $dynamicPricing: Boolean
        $pricePerHour: Int
        $maxPrice: Int
        $minHour: Int
        $staticPrice: Int
    ){
    addPlan(
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