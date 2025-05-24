
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamService, CreateTeamInvitationInput } from "@/services/teamService";
import { toast } from "@/hooks/use-toast";

const teamService = TeamService.getInstance();

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: () => teamService.getTeamMembers(),
  });
}

export function useTeamInvitations() {
  return useQuery({
    queryKey: ["team-invitations"],
    queryFn: () => teamService.getInvitations(),
  });
}

export function useInviteTeamMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: CreateTeamInvitationInput) => teamService.inviteTeamMember(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
      toast({
        title: "Invitation sent",
        description: "Team member invitation has been sent successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending invitation",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
    },
  });
}

export function useRemoveTeamMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (memberId: string) => teamService.removeMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({
        title: "Member removed",
        description: "Team member has been removed successfully.",
      });
    },
  });
}

export function useClientAccess(clientId: string) {
  return useQuery({
    queryKey: ["client-access", clientId],
    queryFn: () => teamService.getClientAccess(clientId),
    enabled: !!clientId,
  });
}

export function useGrantClientAccess() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ clientId, userId, accessLevel }: { clientId: string; userId: string; accessLevel: 'view' | 'edit' | 'full' }) =>
      teamService.grantClientAccess(clientId, userId, accessLevel),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["client-access", clientId] });
      toast({
        title: "Access granted",
        description: "Client access has been granted successfully.",
      });
    },
  });
}
