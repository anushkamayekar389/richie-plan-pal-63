
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReminderService, CreateReminderInput, Reminder } from "@/services/reminderService";
import { toast } from "@/hooks/use-toast";

const reminderService = ReminderService.getInstance();

export function useReminders() {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: () => reminderService.getReminders(),
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: CreateReminderInput) => reminderService.createReminder(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      toast({
        title: "Reminder created",
        description: "Your reminder has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating reminder",
        description: error.message || "Failed to create reminder",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateReminderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'completed' | 'overdue' }) => 
      reminderService.updateReminderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      toast({
        title: "Reminder updated",
        description: "Reminder status has been updated.",
      });
    },
  });
}
