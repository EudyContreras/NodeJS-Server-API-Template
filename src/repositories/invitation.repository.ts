import Invitation from '../entitymodel/entities/invitation.entity'
import { IInvitation } from '../entitymodel/models/invitation.model'

function dataTransferDocument(invitation: any) {
   const dto = {
      id: invitation.id,
      email: invitation.email,
      name: invitation.name
   };
   return dto;
}

/**
 * Data access layer Repository used
 * for interfacing with the invitation data.
 */
class InvitationRepository {

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
         return invitations.map(x => dataTransferDocument((x as any).toClient()));
      }

      return invitations.map(x => (x as any).toClient());
   }

   async getAllInvitationsWhere(query: any, options = { dto: true }) {
      const invitations = await Invitation
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return invitations.map(x => dataTransferDocument((x as any).toClient()));
      }

      return invitations.map(x => (x as any).toClient());
   }

   async getInvitation(invitationId: string, options = { dto: true }) {
      const invitation = await Invitation
         .findById(invitationId)
         .select(this.exclude)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getInvitationWhere(criteria: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromInvitation(invitationId: string, select: any) {
      const invitation = await Invitation
         .findById(invitationId)
         .select(select)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      return result;
   }

   async insertInvitation(data: any, options = { dto: true }) {
      const invitation = new Invitation(data);

      await invitation.validate();

      const saved = await invitation.save(this.options);

      const result = saved ? (saved as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateInvitation(invitationId: string, update: any, options = { dto: true }) {
      const invitation = await Invitation
         .findByIdAndUpdate(invitationId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateInvitationWhere(query: any, update: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteInvitation(invitationId: string, options = { dto: true }) {
      const invitation = await Invitation
         .findByIdAndDelete(invitationId)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteInvitationWhere(query: any, options = { dto: true }) {
      const invitation = await Invitation
         .findOneAndDelete(query)
         .exec();

      const result = invitation ? (invitation as any).toClient() : null;

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

export default InvitationRepository;