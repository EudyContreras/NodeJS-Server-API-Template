import EntitySchema from '../entitySchema';

import { IPriviledge } from '../models/priviledge.model';

const schema = new EntitySchema({
    userId: {
        type: String,
        required: true
    },
    actionId: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 3,
        required: true
    },
    controllerId: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 3,
        required: true,
    }
}, { strict: false, versionKey: false });

schema.index({userId: 1, actionId: 1, controllerId: 1,}, {unique: true});

const Priviledge = schema.getModel<IPriviledge>('Priviledge');

export default Priviledge;