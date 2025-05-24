
export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  clientId?: string;
  clientName?: string;
  type: 'review' | 'followup' | 'document' | 'meeting' | 'custom';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderInput {
  title: string;
  description: string;
  dueDate: string;
  clientId?: string;
  type: 'review' | 'followup' | 'document' | 'meeting' | 'custom';
  priority: 'low' | 'medium' | 'high';
}
