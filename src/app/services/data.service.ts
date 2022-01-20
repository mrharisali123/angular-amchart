import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const COUNTRY_API = 'https://corona.lmao.ninja/v2/countries/India, Nepal,Bangladesh,Pakistan,Bhutan,Sri Lanka,Maldives?yesterday';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getCountries() {
    return this.httpClient.get(COUNTRY_API);
    //.subscribe((data: any) => {
    //console.log(data);
    // });
  }
}
