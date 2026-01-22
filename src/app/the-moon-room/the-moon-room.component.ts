import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-the-moon-room',
  imports: [CommonModule, RouterModule],
  templateUrl: './the-moon-room.component.html',
  styleUrl: './the-moon-room.component.scss'
})
export class TheMoonRoomComponent {
  photos = [
    {
      src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
      alt: 'The Moon suite main view'
    },
    {
      src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon balcony light'
    },
    {
      src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon resting corner'
    },
    {
      src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon detail'
    },
    {
      src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon pillows'
    },
    {
      src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon seating'
    },
    {
      src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Moon terrace'
    }
  ];

  modalOpen = false;
  activeIndex = 0;

  openModal(index: number): void {
    this.activeIndex = index;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  nextPhoto(): void {
    this.activeIndex = (this.activeIndex + 1) % this.photos.length;
  }

  prevPhoto(): void {
    this.activeIndex = (this.activeIndex - 1 + this.photos.length) % this.photos.length;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.modalOpen) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeModal();
      return;
    }

    if (event.key === 'ArrowRight') {
      this.nextPhoto();
    }

    if (event.key === 'ArrowLeft') {
      this.prevPhoto();
    }
  }
}
