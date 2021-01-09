import gql from 'graphql-tag'

export default gql`
    query fetchPlanDetail($id:ID){
        plan(id:$id){
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