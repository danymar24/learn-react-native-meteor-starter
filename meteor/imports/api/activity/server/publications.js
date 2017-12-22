import { Meteor } from 'meteor/meteor';
import { Activity } from '../activity';

Meteor.publish('Activity.pub.list', ({locationId}) => {
    return Activity.find({ locationId }, { limit: 5, sort: {createdAt: -1} });
});
