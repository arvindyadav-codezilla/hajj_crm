import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { JobType } from '@core/constants/ApiConstant';
import { AuthService } from '../services/auth.service';  // Import the AuthService

@Injectable({
  providedIn: 'root',  // Make it available to the entire app
})
export class JobListingService {
  private apiUrl = environment.HAJJ_APP_API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService  // Injecting AuthService to get the token
  ) {}

  // Method to retrieve the Authorization header with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Get the token from the AuthService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`); // Add Authorization header with the token
    }
    return headers;
  }

  getConfig(type: string,lang:string): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.get(`${this.apiUrl}${JobType.get(lang)}/${type}/`, { headers });
  }

  createConfig(type: string, data: any,lang:string): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.post(`${this.apiUrl}${JobType.Post(lang)}/${type}/`, data, { headers });
  }

  updateConfig(type: string, id: string, data: any,lang:string): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.put(`${this.apiUrl}${JobType.Put(lang)}/${type}/${id}/`, data, { headers });
  }

  deleteConfig(type: string, id: string,lang:string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}${JobType.Delete(lang)}/${type}/${id}/`, { headers });
  }
  
}
