import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TaskStatusEnum } from '../../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
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
  }
}
