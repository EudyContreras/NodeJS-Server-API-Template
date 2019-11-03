import EntitySchema from '../entitySchema';

import { IRole } from '../models/role.model';

const schema = new EntitySchema({
    name: {
        unique: true,
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3
    },
    code: {
        type: String,
        unique: true
    },
}, { timestamps: true,  strict: false, versionKey: false });

const Role = schema.getModel<IRole>('Role');

export default Role;