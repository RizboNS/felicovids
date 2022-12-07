import { Component } from '@angular/core';
import { CashingService } from './services/cashing/cashing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cashingService: CashingService) {}
  title = 'felicovids';
}
