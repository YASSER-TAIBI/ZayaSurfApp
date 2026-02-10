import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact: ContactRequest = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = false;
  submitSuccess = '';
  submitError = '';

  constructor(private http: HttpClient) {}

  submitContact(): void {
    this.submitSuccess = '';
    this.submitError = '';
    this.isSubmitting = true;

    this.http.post(`${environment.apiBaseUrl}/api/contact`, this.contact).subscribe({
      next: () => {
        this.submitSuccess = 'Message sent successfully. We will get back to you shortly.';
        this.contact = {
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        };
        this.isSubmitting = false;
      },
      error: () => {
        this.submitError = 'Could not send message. Please try again or contact us directly.';
        this.isSubmitting = false;
      }
    });
  }
}
