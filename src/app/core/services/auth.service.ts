import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import {Auth} from '@core/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.HAJJ_APP_API_URL; 

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'UUzHTGL1rVPfqzISAfYBX6x5xPBNArnJl4NHN3Tv');
    formData.append('client_secret', 'OkPn0ubggOFWlfVSVT4kwOK7XK12nqobR9TbY57B8gYPB0MMyUa7I01ZOs3yAcUofkNTASrAkVMu9PX58cTlaaiANOjFgPJ37gIRK8JEPFmB7Xg3oPoPJ7MOn9SEyhR8');
    formData.append('username', username);
    formData.append('password', password);
  
    return this.http.post(`${this.apiUrl}${Auth.login()}`, formData);
  }
  

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
