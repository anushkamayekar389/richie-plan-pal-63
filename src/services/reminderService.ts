import { Reminder, CreateReminderInput } from "@/types/reminder";

export type { Reminder, CreateReminderInput };

export class ReminderService {
  private static instance: ReminderService;
  private reminders: Reminder[] = [
    {
      id: "1",
      title: "Quarterly Review - Amit Shah",
      description: "Quarterly portfolio review and goal assessment",
      dueDate: "2025-06-28",
      clientId: "client-1",
      clientName: "Amit Shah",
      type: "review",
      priority: "high",
      status: "pending",
      createdAt: "2025-05-20T00:00:00Z",
      updatedAt: "2025-05-20T00:00:00Z"
    },
    {
      id: "2",
      title: "KYC Update - Raj Mehta",
      description: "Update KYC documents for compliance",
      dueDate: "2025-06-30",
      clientId: "client-2",
      clientName: "Raj Mehta",
      type: "document",
      priority: "medium",
      status: "pending",
      createdAt: "2025-05-22T00:00:00Z",
      updatedAt: "2025-05-22T00:00:00Z"
    }
  ];

  static getInstance(): ReminderService {
    if (!ReminderService.instance) {
      ReminderService.instance = new ReminderService();
    }
    return ReminderService.instance;
  }

  async getReminders(): Promise<Reminder[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update overdue status
    const now = new Date();
    this.reminders.forEach(reminder => {
      if (new Date(reminder.dueDate) < now && reminder.status === 'pending') {
        reminder.status = 'overdue';
      }
    });
    
    return this.reminders.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  async createReminder(input: CreateReminderInput): Promise<Reminder> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      ...input,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.reminders.push(reminder);
    return reminder;
  }

  async updateReminderStatus(id: string, status: 'pending' | 'completed' | 'overdue'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      reminder.status = status;
      reminder.updatedAt = new Date().toISOString();
    }
  }

  async deleteReminder(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    this.reminders = this.reminders.filter(r => r.id !== id);
  }
}
