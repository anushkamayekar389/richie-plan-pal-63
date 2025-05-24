import { TeamMember, TeamInvitation, CreateTeamInvitationInput, ClientAccess } from "@/types/team";

export type { TeamMember, TeamInvitation, CreateTeamInvitationInput, ClientAccess };

export class TeamService {
  private static instance: TeamService;
  private teamMembers: TeamMember[] = [
    {
      id: "1",
      email: "john.doe@advisor.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
      status: "active",
      joinedAt: "2025-01-15T00:00:00Z",
      invitedBy: "self"
    },
    {
      id: "2",
      email: "sarah.manager@advisor.com",
      firstName: "Sarah",
      lastName: "Manager",
      role: "advisor",
      status: "active",
      joinedAt: "2025-02-01T00:00:00Z",
      invitedBy: "1"
    }
  ];

  private invitations: TeamInvitation[] = [
    {
      id: "1",
      email: "new.member@advisor.com",
      role: "paraplanner",
      invitedBy: "1",
      invitedAt: "2025-05-20T00:00:00Z",
      expiresAt: "2025-05-27T00:00:00Z",
      status: "pending"
    }
  ];

  private clientAccess: ClientAccess[] = [
    {
      clientId: "client-1",
      userId: "2",
      accessLevel: "view",
      grantedBy: "1",
      grantedAt: "2025-05-20T00:00:00Z"
    }
  ];

  static getInstance(): TeamService {
    if (!TeamService.instance) {
      TeamService.instance = new TeamService();
    }
    return TeamService.instance;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.teamMembers;
  }

  async getInvitations(): Promise<TeamInvitation[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.invitations.filter(inv => inv.status === 'pending');
  }

  async inviteTeamMember(input: CreateTeamInvitationInput): Promise<TeamInvitation> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const invitation: TeamInvitation = {
      id: Date.now().toString(),
      ...input,
      invitedBy: "1", // Current user ID
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      status: 'pending'
    };
    
    this.invitations.push(invitation);
    return invitation;
  }

  async removeMember(memberId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.teamMembers = this.teamMembers.filter(m => m.id !== memberId);
  }

  async updateMemberRole(memberId: string, role: 'admin' | 'advisor' | 'paraplanner'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const member = this.teamMembers.find(m => m.id === memberId);
    if (member) {
      member.role = role;
    }
  }

  async getClientAccess(clientId: string): Promise<ClientAccess[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.clientAccess.filter(access => access.clientId === clientId);
  }

  async grantClientAccess(clientId: string, userId: string, accessLevel: 'view' | 'edit' | 'full'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove existing access for this user-client pair
    this.clientAccess = this.clientAccess.filter(
      access => !(access.clientId === clientId && access.userId === userId)
    );
    
    // Add new access
    this.clientAccess.push({
      clientId,
      userId,
      accessLevel,
      grantedBy: "1", // Current user ID
      grantedAt: new Date().toISOString()
    });
  }

  async revokeClientAccess(clientId: string, userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.clientAccess = this.clientAccess.filter(
      access => !(access.clientId === clientId && access.userId === userId)
    );
  }
}
