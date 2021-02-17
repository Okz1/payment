import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent {

  constructor(private router: Router) { }

  redirectToPayment() {
    this.router.navigate(['payment']);
  }
}
