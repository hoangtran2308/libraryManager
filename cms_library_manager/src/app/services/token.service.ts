import { Injectable } from '@angular/core';
import {Constant} from "../util/constant";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  key = Constant.LIBRARY_STORAGE_KEY

  constructor() {
    // localStorage.setItem(this.key, '1234')
  }

  setKey(value: string){
    localStorage.setItem(this.key, value)
  }

  clearKey(){
    localStorage.removeItem(this.key)
  }

  getToken(){
    let x = localStorage.getItem(this.key)
    if(!x) return
    return JSON.parse(<string>x)
  }

}
