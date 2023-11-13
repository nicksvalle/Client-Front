import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposta } from '../../proposta';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  url = 'http://localhost:8080/proposals';

  constructor(private http: HttpClient) { }

  getProposta(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.url);
  }

  save(proposta : Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.url, proposta);
  }

  update(proposta : Proposta): Observable<Proposta>{
    return this.http.put<Proposta>(`${this.url}/${proposta.id}`, proposta);
  }

  delete(proposta : Proposta): Observable<void>{
    return this.http.delete<void>(`${this.url}/${proposta.id}`);
  }

}
