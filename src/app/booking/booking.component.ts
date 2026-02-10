import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrival: string;
  departure: string;
  package: string;
  accommodation: string;
  guests: string;
  referral: string;
  diet: string;
  message: string;
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  booking: BookingRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrival: '',
    departure: '',
    package: '',
    accommodation: '',
    guests: '',
    referral: '',
    diet: '',
    message: ''
  };
  isSubmitting = false;
  submitSuccess = '';
  submitError = '';

  constructor(private http: HttpClient) {}

  submitBooking(): void {
    this.submitSuccess = '';
    this.submitError = '';
    this.isSubmitting = true;

    this.http.post(`${environment.apiBaseUrl}/api/booking`, this.booking).subscribe({
      next: () => {
        this.submitSuccess = 'Booking request sent. We will contact you shortly.';
        this.booking = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          arrival: '',
          departure: '',
          package: '',
          accommodation: '',
          guests: '',
          referral: '',
          diet: '',
          message: ''
        };
        this.isSubmitting = false;
      },
      error: () => {
        this.submitError = 'Could not send booking. Please try again or contact us directly.';
        this.isSubmitting = false;
      }
    });
  }
}
