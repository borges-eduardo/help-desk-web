import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnico';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findAll(page?: number, size?: number): Observable<Page<Tecnico>> {
    return this.http.get<Page<Tecnico>>(`${API_CONFIG.baseUrl}/tecnicos?page=${page ?? 0}&size=${size ?? 10}`)
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }
}
