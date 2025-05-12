import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CardComponent } from '../../componente/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CardComponent, NgIf]
})
export class HomeComponent {
  menuAberto = false;

  @ViewChild('menuContainer') menuRef!: ElementRef;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  acessarDashboard(): void {
    this.menuAberto = false;
    this.router.navigate(['/dashboard']);
  }

  retornarLogin(): void {
    this.menuAberto = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent): void {
    const clickedInside = this.menuRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuAberto = false;
    }
  }
}