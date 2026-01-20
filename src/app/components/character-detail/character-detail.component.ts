import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Character, Episode, CharacterService } from '../../services/character.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid detail-container" [ngClass]="{'light-mode': !isDarkMode}">
      <button class="btn btn-secondary mb-4" (click)="goBack()">
        ← Volver a Personajes
      </button>

      <button class="btn btn-theme-toggle" (click)="toggleTheme()">
        {{ isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
      </button>

      <div *ngIf="character" class="detail-card">
        <div class="detail-header">
          <img [src]="character.image" [alt]="character.name" class="detail-image">
          <div class="detail-title">
            <h1>{{ character.name }}</h1>
            <p class="detail-type">{{ character.species }}</p>
          </div>
        </div>

        <div class="detail-body">
          <div class="detail-section">
            <h2>Información General</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Estado:</label>
                <span [ngClass]="'status-' + character.status.toLowerCase()">
                  {{ character.status }}
                </span>
              </div>
              <div class="info-item">
                <label>Especie:</label>
                <span>{{ character.species }}</span>
              </div>
              <div class="info-item">
                <label>Género:</label>
                <span>{{ character.gender }}</span>
              </div>
              <div class="info-item">
                <label>Tipo:</label>
                <span>{{ character.type || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h2>Ubicación</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Origen:</label>
                <span>{{ character.origin?.name || 'Desconocido' }}</span>
              </div>
              <div class="info-item">
                <label>Ubicación Actual:</label>
                <span>{{ character.location?.name || 'Desconocida' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h2>Episodios</h2>
            
            <!-- Contador Visual -->
            <div class="episode-counter">
              <div class="counter-badge">{{ character.episode?.length || 0 }}</div>
              <div class="counter-info">
                <p class="counter-text">Apariciones en episodios</p>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="getProgressPercentage()"></div>
                </div>
                <p class="progress-text">{{ getProgressPercentage() }}% de la serie</p>
              </div>
            </div>

            <!-- Lista de Episodios -->
            <div class="episodes-list">
              <p *ngIf="!character.episode || character.episode.length === 0">
                No hay información de episodios
              </p>
              
              <div *ngIf="character.episode && character.episode.length > 0" class="episodes-container">
                <div class="episodes-loading" *ngIf="loadingEpisodes">
                  <p>Cargando información de episodios...</p>
                </div>

                <div *ngIf="!loadingEpisodes" class="episodes-grid">
                  <div *ngFor="let episode of episodes" class="episode-card">
                    <div class="episode-header">
                      <span class="episode-number">{{ episode.episode }}</span>
                      <span class="episode-date">{{ episode.air_date }}</span>
                    </div>
                    <h4 class="episode-name">{{ episode.name }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h2>Información Técnica</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>ID:</label>
                <span>{{ character.id }}</span>
              </div>
              <div class="info-item">
                <label>Creado:</label>
                <span>{{ character.created | date: 'short' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!character" class="no-character">
        <p>Cargando información del personaje...</p>
      </div>
    </div>
  `,
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  episodes: Episode[] = [];
  isDarkMode: boolean = true;
  loadingEpisodes: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.loadThemePreference();
    const characterJson = sessionStorage.getItem('selectedCharacter');
    if (characterJson) {
      this.character = JSON.parse(characterJson);
      this.loadEpisodes();
    }
  }

  loadEpisodes(): void {
    if (!this.character || !this.character.episode || this.character.episode.length === 0) {
      return;
    }

    this.loadingEpisodes = true;

    // Extraer los IDs de los episodios desde las URLs
    const episodeIds = this.character.episode.map(url => {
      const id = url.split('/').pop();
      return parseInt(id || '0', 10);
    }).filter(id => id > 0);

    if (episodeIds.length === 0) {
      this.loadingEpisodes = false;
      return;
    }

    this.characterService.getEpisodesByIds(episodeIds).subscribe({
      next: (data) => {
        // Convertir a array si es un solo episodio
        this.episodes = Array.isArray(data) ? data : [data];
        // Ordenar por número de episodio
        this.episodes.sort((a, b) => {
          const aNum = parseInt(a.episode.split('E')[1]);
          const bNum = parseInt(b.episode.split('E')[1]);
          return aNum - bNum;
        });
        this.loadingEpisodes = false;
      },
      error: (error) => {
        console.error('Error cargando episodios:', error);
        this.loadingEpisodes = false;
      }
    });
  }

  getProgressPercentage(): number {
    // Máximo de episodios en la serie es aproximadamente 51
    const totalEpisodes = 51;
    const characterEpisodes = this.character?.episode?.length || 0;
    return Math.round((characterEpisodes / totalEpisodes) * 100);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      if (!this.isDarkMode) {
        document.body.classList.add('light-mode');
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}

