const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const UserType = require('./user_type')
const CustomerType = require('./customer_type')
const ReservationType = require('./reservation_type')
const PlanType = require('./plan_type')

const mongoose = require('mongoose')
const Customer = mongoose.model('customer')
const Reservation = mongoose.model('reservation')
const Plan = mongoose.model('plan')

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
    },
    reservations: {
      type: new GraphQLList(ReservationType),
      resolve(parentValue, args, req){
        return Reservation.find({})
      }
    },
    plans: {
      type: new GraphQLList(PlanType),
      resolve(parentValue, args, req){
        return Plan.find({})
      }
    }
  }
});

module.exports = RootQueryType;
