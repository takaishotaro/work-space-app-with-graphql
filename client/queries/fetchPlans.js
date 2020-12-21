import gql from 'graphql-tag'

export default gql`
    query fetchPlans{
        plans{
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