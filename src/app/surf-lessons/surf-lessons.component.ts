import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-surf-lessons',
  imports: [CommonModule, RouterModule],
  templateUrl: './surf-lessons.component.html',
  styleUrl: './surf-lessons.component.scss'
})
export class SurfLessonsComponent {}
