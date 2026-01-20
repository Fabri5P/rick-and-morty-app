import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          🌐 Portal Interdimensional
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">Acerca de</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}
