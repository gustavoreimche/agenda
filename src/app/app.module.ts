import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
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
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
