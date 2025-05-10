import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../componente/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CardComponent],
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }

  acessarDashboard(){
    this.router.navigate(['/dashboard'])
  }
}