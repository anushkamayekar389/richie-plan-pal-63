
export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'advisor' | 'paraplanner';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  invitedBy: string;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: 'admin' | 'advisor' | 'paraplanner';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired';
}

export interface CreateTeamInvitationInput {
  email: string;
  role: 'admin' | 'advisor' | 'paraplanner';
}

export interface ClientAccess {
  clientId: string;
  userId: string;
  accessLevel: 'view' | 'edit' | 'full';
  grantedBy: string;
  grantedAt: string;
}
