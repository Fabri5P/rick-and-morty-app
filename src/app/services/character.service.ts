import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
  url: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private episodeUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}?page=${page}`);
  }

  searchCharacters(name: string, page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(
      `${this.apiUrl}?name=${name}&page=${page}`
    );
  }

  getEpisodeByUrl(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }

  getEpisodesByIds(ids: number[]): Observable<Episode | Episode[]> {
    const idString = ids.join(',');
    return this.http.get<Episode | Episode[]>(`${this.episodeUrl}/${idString}`);
  }
}
