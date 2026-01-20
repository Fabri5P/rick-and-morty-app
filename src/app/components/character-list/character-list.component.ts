import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CharacterService, Character, CharacterResponse } from '../../services/character.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container-fluid">
      <div class="main-content">
        <h1>🌟 PORTAL INTERDIMENSIONAL 🌟</h1>

        <!-- Simple Search Bar -->
        <div class="search-container">
          <input 
            type="text" 
            class="search-input" 
            placeholder="Escribe un nombre..."
            [(ngModel)]="searchTerm"
          >
          <div class="button-group">
            <button class="btn-search" (click)="performSearch()">
              🔍 Buscar
            </button>
            <button class="btn-clear" (click)="clearAll()">
              ✕ Limpiar
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-container">
          <div class="spinner"></div>
          <p>Conectando con el portal...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="errorMessage && !isLoading" class="alert" role="alert">
          {{ errorMessage }}
          <button class="btn btn-sm btn-outline-danger ms-3" (click)="clearAll()">
            Reintentar
          </button>
        </div>

        <!-- Characters Grid -->
        <div *ngIf="!isLoading && characters.length > 0" class="row g-4">
          <div class="col-12 col-md-6" *ngFor="let character of characters">
            <div class="character-card" (click)="selectCharacter(character)">
              <img [src]="character.image" [alt]="character.name" class="character-image">
              <div class="character-info">
                <h5 class="character-name">{{ character.name }}</h5>
                <div class="character-details">
                  <div>
                    <span class="character-detail-label">Estado:</span>
                    <span class="character-detail-value" [ngClass]="'status-' + character.status.toLowerCase()">
                      {{ character.status }}
                    </span>
                  </div>
                  <div>
                    <span class="character-detail-label">Especie:</span>
                    <span class="character-detail-value">{{ character.species }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="!isLoading && characters.length === 0 && !errorMessage" class="no-results">
          <p>🌌 No se detectaron entidades en este portal</p>
        </div>

        <!-- Simple Pagination -->
        <div *ngIf="!isLoading && characters.length > 0" class="pagination-container">
          <div class="pagination-controls">
            <button 
              class="btn-pagination btn-nav" 
              (click)="goBack()"
              [disabled]="page === 1"
            >
              ← Atrás
            </button>

            <span class="page-info-detail">
              Página {{ page }} de {{ maxPages }}
            </span>

            <button 
              class="btn-pagination btn-nav" 
              (click)="goForward()"
              [disabled]="page >= maxPages"
            >
              Adelante →
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';
  page: number = 1;
  maxPages: number = 1;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.characterService.getCharacters(this.page).subscribe({
      next: (response: CharacterResponse) => {
        this.characters = response.results;
        this.maxPages = response.info.pages;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al conectar con el portal interdimensional';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  performSearch(): void {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Escribe algo en la búsqueda';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.page = 1;

    this.characterService.searchCharacters(this.searchTerm, this.page).subscribe({
      next: (response: CharacterResponse) => {
        this.characters = response.results;
        this.maxPages = response.info.pages;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = `No se encontró "${this.searchTerm}" en el portal`;
        this.characters = [];
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  clearAll(): void {
    this.searchTerm = '';
    this.page = 1;
    this.errorMessage = '';
    this.fetchCharacters();
  }

  goForward(): void {
    if (this.page < this.maxPages) {
      this.page++;
      if (this.searchTerm.trim()) {
        this.performSearch();
      } else {
        this.fetchCharacters();
      }
    }
  }

  goBack(): void {
    if (this.page > 1) {
      this.page--;
      if (this.searchTerm.trim()) {
        this.performSearch();
      } else {
        this.fetchCharacters();
      }
    }
  }

  selectCharacter(character: Character): void {
    sessionStorage.setItem('selectedCharacter', JSON.stringify(character));
    this.router.navigate(['/character', character.id]);
  }
}
