import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-other-surf-experiences',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './other-surf-experiences.component.html',
  styleUrl: './other-surf-experiences.component.scss'
})
export class OtherSurfExperiencesComponent {
  nightlyRate = 74.99;
  nights = 1;

  get totalPrice(): number {
    const nights = Number(this.nights) || 0;
    if (nights <= 0) {
      return 0;
    }
    return nights * this.nightlyRate;
  }
}
