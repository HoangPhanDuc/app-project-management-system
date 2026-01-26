export interface Task {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  deadline: string;
  start_date: string;
  assigned_to: string;
  created_by: string;
}
