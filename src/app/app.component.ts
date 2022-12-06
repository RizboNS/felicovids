import { Component, OnInit } from '@angular/core';
import { CashingServiceService } from './services/cashing/cashing-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private cashingService: CashingServiceService) {}
  ngOnInit(): void {}
  title = 'felicovids';
  showFiller = false;
}
