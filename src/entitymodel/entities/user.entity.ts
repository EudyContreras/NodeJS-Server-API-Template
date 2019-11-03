import EntitySchema from '../entitySchema';
import { IUser } from '../models/user.model';

const schema = new EntitySchema({
    invitationId: {
        type: String,
        required: false,
        trim: true,
    },
    roleCode: {
        type: String,
        required: true,
        default: null
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
}, { timestamps: true, strict: false, versionKey: false });

const User = schema.getModel<IUser>('User');

export default User;