import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TASK_STATUS_OPTIONS, TaskStatusEnum } from '../../task.model';
import { TasksService } from '../../tasks.service';
import { TasksServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  // private tasksService = inject(TasksService);
  private tasksService = inject(TasksServiceToken);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS)
  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case TaskStatusEnum.OPEN:
        return 'Open';
      case TaskStatusEnum.IN_PROGRESS:
        return 'Working on it';
      case TaskStatusEnum.DONE:
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatusEnum = TaskStatusEnum.OPEN;

    switch (status) {
      case 'open':
        newStatus = TaskStatusEnum.OPEN;
        break;
      case 'in-progress':
        newStatus = TaskStatusEnum.IN_PROGRESS;
        break;
      case 'done':
        newStatus = TaskStatusEnum.DONE;
        break;
      default:
        newStatus = TaskStatusEnum.OPEN;
        break;
    }

    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
