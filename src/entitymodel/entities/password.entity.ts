import EntitySchema from '../entitySchema';

import { IPassword } from '../models/password.model';

const schema = new EntitySchema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isTemp: {
        type: Boolean,
        required: true
    }
}, { timestamps: false,  strict: false, versionKey: false });

const Password = schema.getModel<IPassword>('Password');

export default Password;