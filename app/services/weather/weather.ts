import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../../models/weather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey: string = '8268328e05f604b61b36772ae0075bed';
  URI: string = '';

  constructor(private httpClient: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?&appid=${this.apiKey}&units=metric&q=`;
  }


  getWeather(cityName: string, countryCode: string) {
    return this.httpClient.get(`${this.URI}${cityName},${countryCode}&units=metric&lang=es`);
  }

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    
    return this.httpClient.get<any>(url).pipe(
      map(data => this.transformWeatherData(data))
    );
  }


  private transformWeatherData(data: any): WeatherData {
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      windSpeed: data.wind.speed
    };
  }
}