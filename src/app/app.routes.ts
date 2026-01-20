import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';
import { HouseComponent } from './house/house.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SurfGuidingComponent } from './surf-guiding/surf-guiding.component';
import { SurfLessonsComponent } from './surf-lessons/surf-lessons.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'house', component: HouseComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'surf-lessons', component: SurfLessonsComponent },
  { path: 'surf-guiding', component: SurfGuidingComponent }
];
