import { Component } from '@angular/core';

@Component({
  selector: 'app-activities',
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  onActivityToggle(event: Event): void {
    const target = event.target as HTMLDetailsElement | null;
    if (!target || !target.open) {
      return;
    }

    const panels = target.parentElement?.querySelectorAll<HTMLDetailsElement>('details.activity-panel');
    panels?.forEach((panel) => {
      if (panel !== target) {
        panel.open = false;
      }
    });
  }
}
