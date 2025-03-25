import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class BaseDataAccessService {
  protected abstract _baseUrl: string;

  constructor(private http: HttpClient) {}

  protected makePostRequest(body: any, methodName: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this._baseUrl + methodName, body, { headers })
      .toPromise()
      .then(response => {
        console.log('Response:', response); // Handle the response here
        return response;
      })
      .catch(error => {
        console.error('Error:', error); // Handle the error here
        throw error;
      });
  }
}
