const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const UserType = require('./user_type')
const CustomerType = require('./customer_type')
const mongoose = require('mongoose')
const Customer = mongoose.model('customer')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        return req.user;
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args, req){
        return Customer.find({})
      }
    }
  }
});

module.exports = RootQueryType;
