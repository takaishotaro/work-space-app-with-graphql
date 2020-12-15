const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = graphql
const mongoose = require('mongoose')
const Customer = mongoose.model('customer')

const CustomerType = new GraphQLObjectType({
    name: 'CustomerType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString }
    }
})

module.exports = CustomerType