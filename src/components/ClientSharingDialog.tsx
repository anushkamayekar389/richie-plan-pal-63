
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Share, Users, Eye, Edit, Crown, Trash2 } from "lucide-react";
import { useTeamMembers, useClientAccess, useGrantClientAccess } from "@/hooks/use-team";
import { Label } from "@/components/ui/label";

interface ClientSharingDialogProps {
  clientId: string;
  clientName: string;
}

export const ClientSharingDialog = ({ clientId, clientName }: ClientSharingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [accessLevel, setAccessLevel] = useState<'view' | 'edit' | 'full'>('view');
  
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: clientAccess = [] } = useClientAccess(clientId);
  const grantAccess = useGrantClientAccess();

  const availableMembers = teamMembers.filter(member => 
    !clientAccess.some(access => access.userId === member.id)
  );

  const handleGrantAccess = async () => {
    if (selectedMember && accessLevel) {
      await grantAccess.mutateAsync({
        clientId,
        userId: selectedMember,
        accessLevel
      });
      setSelectedMember("");
      setAccessLevel('view');
    }
  };

  const getAccessIcon = (level: string) => {
    switch (level) {
      case 'view': return <Eye className="w-3 h-3" />;
      case 'edit': return <Edit className="w-3 h-3" />;
      case 'full': return <Crown className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  const getAccessVariant = (level: string) => {
    switch (level) {
      case 'view': return 'outline';
      case 'edit': return 'secondary';
      case 'full': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="w-4 h-4 mr-2" /> Share Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Share {clientName}
          </DialogTitle>
          <DialogDescription>
            Manage team member access to this client's information and files.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Access */}
          <div>
            <h4 className="font-medium mb-3">Current Team Access</h4>
            {clientAccess.length === 0 ? (
              <p className="text-sm text-gray-500">No team members have access to this client yet.</p>
            ) : (
              <div className="space-y-2">
                {clientAccess.map((access) => {
                  const member = teamMembers.find(m => m.id === access.userId);
                  if (!member) return null;
                  
                  return (
                    <div key={access.userId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{member.firstName} {member.lastName}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getAccessVariant(access.accessLevel) as any} className="flex items-center gap-1">
                          {getAccessIcon(access.accessLevel)}
                          {access.accessLevel}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grant New Access */}
          {availableMembers.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Grant Access to Team Member</h4>
              <div className="space-y-4">
                <div>
                  <Label>Select Team Member</Label>
                  <Select value={selectedMember} onValueChange={setSelectedMember}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.firstName} {member.lastName} ({member.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Access Level</Label>
                  <Select value={accessLevel} onValueChange={(value: 'view' | 'edit' | 'full') => setAccessLevel(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only - Can view client information</SelectItem>
                      <SelectItem value="edit">Edit - Can view and edit client information</SelectItem>
                      <SelectItem value="full">Full Access - Can view, edit, and manage client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleGrantAccess} 
                  disabled={!selectedMember || grantAccess.isPending}
                  className="w-full"
                >
                  Grant Access
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
