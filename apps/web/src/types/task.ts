export interface Task {
    id: number;
    description: string;
    completed: boolean;
    startDate: string;
    endDate?: string;
}