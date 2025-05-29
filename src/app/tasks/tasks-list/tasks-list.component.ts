import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TaskStatusEnum } from '../task.model';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);
  // private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === TaskStatusEnum.OPEN);
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === TaskStatusEnum.IN_PROGRESS);
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === TaskStatusEnum.DONE);
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
