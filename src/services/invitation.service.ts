
import InvitationRepository from '../repositories/invitation.repository';
import NoticationService from './notification.service';
import RoleService from './role.service';

import { InvitationMessages } from '../messages/message.response';


export default class InviationService {

   /**
    * @description Checks if there if an invitation has been issued to 
    * the current user. 
    * @param email The email of the possibly invited user.
    * @returns The possible flag indicating if the user has 
    * received and invitation or the generated error.
    */
   async hasInvitation(email: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.hasInvitationWhere({ email: email });

         if (!invitation) {
            return { error: InvitationMessages.NO_INVITATION }
         }
         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Checks if there if an invitation has been issued to 
    * the current user and if the invitation is active. 
    * @information An invitation is active when it has not expired.
    * @param email The email of the possibly invited user. 
    * @returns The possible flag indicating if the user has received
    * and invitation or the generated error.
    */
   async hasActiveInvitation(email: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.hasInvitationWhere({ email: email, expired: false });

         if (!invitation) {
            return { error: InvitationMessages.EXPIRED }
         }
         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Checks if there if an invitation has been issued to 
    * the current user and if the invitation is active and pending.
    * @information An invitation is active when it has not expired.
    * @param email The email of the possibly invited user. 
    * @returns  The possible flag indicating if the user has received 
    * and invitation or the generated error.
    */
   async hasActivePendingInvitation(email: string): Promise<{ result?: any, error?: any }> {
      try {
         const query = { email: email, expired: false, pending: true };

         const repository = new InvitationRepository();

         const invitation = await repository.getInvitationWhere(query);

         if (!invitation) {
            return { error: InvitationMessages.NOT_PENDING }
         }
         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Gets all the available invitations.
    * @returns The possible listof invitations or the generated error.
    */
   async getAllInvitations(): Promise<{ result?: any[], error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitations = await repository.getAllInvitations();

         return { result: invitations };
      } catch (error) {
         return { error }
      }
   }

   /**
     * @description Gets all the available invitations.
     * @param criteria The criteria used for making the search.
     * @returns The possible list of invitations or the generated error.
     */
   async getAllInvitationsWhere(criteria: any): Promise<{ result?: any[], error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitations = await repository.getAllInvitationsWhere(criteria);

         return { result: invitations };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Retrieves the invitation attached to the given
    * email if there is any.
    * @param criteria the criteria used for the invitation search.
    * invitation.
    * @returns The invitation attached to the given email or the generated error.
    */
   async getInvitationWhere(criteria: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.getInvitationWhere(criteria);

         if (!invitation) return { error: InvitationMessages.NO_INVITATION }

         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Retrieves the invitation attached to the given
    * invitation id if there is any.
    * @param inviteId The invitation id of the invitation to
    * retrieve
    * @returns The invitation attached to the given id or the generated error.
    */
   async getInvitation(inviteId: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.getInvitation(inviteId);

         if (!invitation) return { error: InvitationMessages.NO_INVITATION }

         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Updates the role code of the invitation that
    * matches the given invite Id.
    * @param inviteId The invitation id of the invitation.
    * @param updateData The invitation data used for the update.
    * @returns {{result: any, error: string}} The invitation
    * attached to the given id or the generated error.
    */
   async updateInvitation(inviteId: any, data: { pending: boolean; }): Promise<{ result?: any; error?: any; }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.updateInvitation(inviteId, data);

         if (!invitation) {
            return { error: InvitationMessages.NO_INVITATION }
         }
         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
  * @description Updates the role code of the invitation that
  * matches the given invite Id.
  * @param criteria The invitation criteria.
  * @param update The invitation data used for the update.
  * @returns The invitation attached to the given id or the generated error.
  */
   async updateInvitationWhere(criteria: any, update: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.updateInvitationWhere(criteria, update);

         if (!invitation) return { error: InvitationMessages.NO_INVITATION }

         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Creates an invitation with the given invitation
    * data and the given creator id.
    * @param creatorId The user that issued the invitaiton.
    * @param inviteData  The data containing the invitation details.
    * @returns The created invitation attached to the given id or the generated error.
    */
   async createInvitation(hostId: string, inviteData: any): Promise<{ result?: any, error?: any }> {
      const email = inviteData.email;
      const roleName = inviteData.role;
      const expirationTime = inviteData.expirationTime;

      try {
         const service = new RoleService();
         const repository = new InvitationRepository();

         const { error, result } = await service.getRoleCode(roleName);

         if (error) return { error: error };

         const exists = await repository.hasInvitationWhere({ email: email });

         if (exists) {
            const resolution = handleExisting(email, repository);
            return resolution;
         }

         const invitation = {
            email: email,
            hostId: hostId,
            roleCode: result,
            expirationTime: expirationTime
         };

         const invite = await repository.insertInvitation(invitation);

         if (invite) {
            const emailService = await new NoticationService();

            await emailService.sendInvitationEmail(invite);
         }
         return { result: invite };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Revokes the invitation for the given user
    * email if any is present..
    * @param email The user email to revoke the invitation from.
    * @returns The revoked invitation or the generated error.
    */
   async revokeInvitation(email: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new InvitationRepository();

         const invitation = await repository.deleteInvitationWhere({ email: email });

         if (!invitation) {
            return { error: InvitationMessages.NO_INVITATION }
         }
         return { result: invitation };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Deletes the invitation that matches the given invitation id.
    * @param inviteId The id of the invitation to delete.
    * @returns The deleted invitation or the generated error.
    */
   async deleteInvitation(inviteId: string) {
      try {
         const repository = new InvitationRepository();

         const invite = await repository.deleteInvitation(inviteId);

         return { result: invite };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Deletes all the available invitations.
    * @returns {{result: any, error: string}} The number invitations
    * deleted or the generated error.
    */
   async clearInvitations() {
      try {
         const repository = new InvitationRepository();

         const result = await repository.clearAll();

         return { result: result };
      } catch (error) {
         return { error: error }
      }
   }
}

/**
 * @description Handles the case when there already exists
 * an invitation attached to the given email.
 * @param email The emai attached to the invitation.
 * @param repository The repository used for interfacing with the invivation data.
 */
async function handleExisting(email: string, repository: InvitationRepository) {
   try {
      const invitation = await repository.getInvitationWhere({ email: email })

      if (invitation.pending && !invitation.expired) {
         return { error: InvitationMessages.IS_PENDING }
      }
      if (!invitation.pending && !invitation.expired) {
         return { error: InvitationMessages.IS_ACTIVE }
      }
      return { error: null }
   } catch (error) {
      return { error: error }
   }
}