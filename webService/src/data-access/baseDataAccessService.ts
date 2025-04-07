import {Injectable} from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import {firstValueFrom} from "rxjs";

@Injectable()
export abstract class BaseDataAccessService {
  protected abstract _baseUrl: string;

  protected constructor(private readonly _httpService: HttpService) {}

  protected async post<T>(body: any, methodName: string): Promise<T | null> {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const result = await firstValueFrom(
        this._httpService.post<T>(this._baseUrl + methodName, body, { headers })
      );
      return result as T;
    } catch (error) {
      console.error('POST request failed:', error);
      return null;
    }
  }

  // Example private GET method (optional)
  protected async get<T>(params: any, methodName: string): Promise<T | null> {
    try {
      console.log('GET request:', this._baseUrl, methodName, params);
      const result = await firstValueFrom(
        this._httpService.get<T>(this._baseUrl + methodName, { params })
      );
      return result.data as T;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }
}
