import { Meteor } from 'meteor/meteor';
import { Locations } from '../locations';

Meteor.publish('Locations.pub.details', ({locationId}) => {
    return Locations.find({ _id: locationId });
});