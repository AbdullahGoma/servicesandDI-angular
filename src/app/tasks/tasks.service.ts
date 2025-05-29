import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatusEnum } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})                                            
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly(); // To Prevent Manipulating with the data

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: TaskStatusEnum.OPEN,
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log("Added Task with title " + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatusEnum) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    this.loggingService.log('Change Task status to ' + newStatus);
  }
}
