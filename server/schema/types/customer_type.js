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
        phoneNumber: { type: GraphQLString },
        reservation: { 
            type: require('./reservation_type'),
            resolve(parentValue){
                return Customer.findById(parentValue).populate('reservation')
                    .then(res => {
                        console.log(res)
                        return res.reservation
                    });
            }
        }
    }
})

module.exports = CustomerType