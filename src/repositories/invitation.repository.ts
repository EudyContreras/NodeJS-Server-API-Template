import Invitation from '../entitymodel/entities/invitation.entity'
import { IInvitation } from '../entitymodel/models/invitation.model';

function dataTransferDocument(invitation: IInvitation) {
   return invitation;
}

/**
 * Data access layer Repository used
 * for interfacing with the invitation data.
 */
export default class InvitationRepository {

   private exclude: any;
   private options: any;

   constructor() {
      this.exclude = null;

      this.options = {
         new: true,
         upsert: false,
         useFindAndModify: false,
         runValidators: true
      };
   }

   async hasInvitation(invitationId: string) {
      const count = await Invitation
         .countDocuments({ _id: invitationId })
         .exec();

      return count > 0;
   }

   async hasInvitationWhere(query: any) {
      const count = await Invitation
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllInvitations(options = { dto: true }) {
      const invitations = await Invitation
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return invitations.map(x => dataTransferDocument(x));
      }

      return invitations;
   }

   async getAllInvitationsWhere(query: any, options = { dto: true }) {
      const invitations = await Invitation
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return invitations.map(x => dataTransferDocument(x));
      }

      return invitations;
   }

   async getInvitation(invitationId: string, options = { dto: true }) {
      const invitation = await Invitation
         .findById(invitationId)
         .select(this.exclude)
         .exec();

      if (options.dto === true && invitation != null) {
         return dataTransferDocument(invitation);
      }

      return invitation;
   }

   async getInvitationWhere(criteria: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      if (options.dto === true && invitation != null) {
         return dataTransferDocument(invitation);
      }

      return invitation;
   }

   async getFromInvitation(invitationId: string, select: any) {
      const invitation = await Invitation
         .findById(invitationId)
         .select(select)
         .exec();

      return invitation;
   }

   async insertInvitation(data: any, options = { dto: true }) {
      const invitation = new Invitation(data);

      await invitation.validate();

      const saved = await invitation.save(this.options);

      if (options.dto === true && saved != null) {
         return dataTransferDocument(saved);
      }

      return saved;
   }

   async updateInvitation(invitationId: string, update: any, options = { dto: true }) {
      const invitation = await Invitation
         .findByIdAndUpdate(invitationId, update, this.options)
         .select(this.exclude)
         .exec();

      if (options.dto === true && invitation != null) {
         return dataTransferDocument(invitation);
      }

      return invitation;
   }

   async updateInvitationWhere(query: any, update: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      if (options.dto === true && invitation != null) {
         return dataTransferDocument(invitation);
      }

      return invitation;
   }

   async deleteInvitation(invitationId: string, options = { dto: true }) {
      const invitation = await Invitation
         .findByIdAndDelete(invitationId)
         .exec();

      const result = invitation ? invitation : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteInvitationWhere(query: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOneAndDelete(query)
         .exec();

      const result = invitation ? invitation : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async clearAllWhere(query: any) {
      return await Invitation
         .deleteMany(query)
         .exec();
   }

   async clearAll() {
      return await Invitation
         .deleteMany({})
         .exec();
   }
}