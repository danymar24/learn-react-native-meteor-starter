import { Meteor } from 'meteor/meteor';
import { Locations } from './locations';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const getNearestLocations = new ValidatedMethod({
    name: 'Locations.getNearestLocations',
    validate: new SimpleSchema({
        latitude: { type: Number, decimal: true},
        longitude: { type: Number, decimal: true}
    }).validator(),
    run({ latitude, longitude}) {
        const query = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $minDistance: 0
            }
        };

        return Locations.find(query, { limit: 10 }).fetch();
    }
});