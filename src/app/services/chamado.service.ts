import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';
import { Page } from '../models/page';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findAll(page?: number, size?: number): Observable<Page<Chamado>> {
    return this.http.get<Page<Chamado>>(`${API_CONFIG.baseUrl}/chamados?page=${page ?? 0}&size=${size ?? 10}`)
  }
}
