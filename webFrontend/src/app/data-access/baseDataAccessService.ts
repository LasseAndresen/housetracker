import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class BaseDataAccessService {
  protected abstract _baseUrl: string;

  constructor(private http: HttpClient) {}

  protected async post<T>(body: any, methodName: string): Promise<T | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
      const result = await this.http.post<T>(this._baseUrl + methodName, body, { headers }).toPromise();
      return result as T;
    } catch (error) {
      console.error('POST request failed:', error);
      return null;
    }
  }

  // Example private GET method (optional)
  protected async get<T>(params: any, methodName: string): Promise<T | null> {
    try {
      const result = await this.http.get<T>(this._baseUrl + methodName, { params }).toPromise();
      return result as T;
    } catch (error) {
      console.error('GET request failed:', error);
      return null;
    }
  }
}
