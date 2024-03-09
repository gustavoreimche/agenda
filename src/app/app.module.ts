import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from './services/toaster.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ScheduleService } from './services/schedule.service';
import { LoadingService } from './components/loading/loading.service';
import { InfoScheduleService } from './components/info-schedule-modal/info-schedule.service';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { DateService } from './services/date.service';
import { AuthService } from './services/auth.service';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp({
      projectId: 'facilite-agenda',
      appId: '1:150961364193:web:9749cbdf1d7289ee4baba0',
      storageBucket: 'facilite-agenda.appspot.com',
      apiKey: 'AIzaSyCYQE0qgffylBv291Zqew-nkjh8CGOfFWo',
      authDomain: 'facilite-agenda.firebaseapp.com',
      messagingSenderId: '150961364193',
      measurementId: 'G-PKV34NWPBF',
    }),
    AngularFirestoreModule,
    ToastModule,
    LoadingComponent
  ],
  providers: [
    DialogService,
    TranslateModule,
    ScheduleService,
    ToasterService,
    LoadingService,
    InfoScheduleService,
    MessageService,
    AuthService,
    DateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
