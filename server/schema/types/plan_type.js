const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = graphql

const PlanType = new GraphQLObjectType({
    name: 'PlanType',
    fields: {
        id: { type: GraphQLID },
        planName: { type: GraphQLString },
        dynamicPricing: { type: GraphQLBoolean },
        pricePerHour: { type: GraphQLInt },
        maxPrice: { type: GraphQLInt },
        minHour: { type: GraphQLInt },
        staticPrice: { type: GraphQLInt }
    },
})

module.exports = PlanType