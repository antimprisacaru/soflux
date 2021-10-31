import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InstagramApiWrapperService {
    constructor(private http: HttpClient) {}

    exchangeCodeForToken(code: string): Observable<any> {
        const formData = new FormData();
        formData.append('client_id', '578272973077520');
        formData.append('client_secret', 'f41975d4207b78c8992f4913ffdd3de8');
        formData.append('grant_type', 'authorization_code');
        formData.append('redirect_uri', 'https://localhost:4200/settings');
        formData.append('code', code);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post('https://api.instagram.com/oauth/access_token', formData, { headers });
    }
}
