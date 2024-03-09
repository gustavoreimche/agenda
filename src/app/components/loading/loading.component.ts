import { LoadingService } from './loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl:'./loading.component.scss',
})
export class LoadingComponent {
  constructor(public ld: LoadingService) {}
}
