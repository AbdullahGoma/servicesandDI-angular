import { InjectionToken, Provider } from "@angular/core";

export enum TaskStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatusEnum;
  text: string;
}[];

// We do this to use DI
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>('task-status-options')

export const TaskStatusOptions:TaskStatusOptions  = [
  {
    value: 'open',
    taskStatus: TaskStatusEnum.OPEN,
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: TaskStatusEnum.IN_PROGRESS,
    text: 'In-Progress',
  },
  {
    value: 'done',
    taskStatus: TaskStatusEnum.DONE,
    text: 'Completed',
  },
];

// We do this to use DI
export const taskStatusOptionProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
}
