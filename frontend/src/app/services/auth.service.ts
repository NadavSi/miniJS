import { User } from './../users/user.model';
import { HttpService } from './http.service';
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

// import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  public isDone = new EventEmitter<boolean>();

  constructor(private httpService: HttpService, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  validateEmail(email) {
    return this.httpService.getRemove<any>(null, 'users/validate/' + email);
  }

  createUser(userData: User) {
    this.httpService.postPatch<any>('users',userData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  login(email: string, password: string) {
    const userDetails = { email: email, password: password };
    this.httpService.postPatch<any>('users/login', userDetails)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const userid = response.userid;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, userid);
          this.router.navigate(["/files"]);
        }
      }, err => {
        this.isDone.emit(true);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.authStatusListener.next(false);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    // console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userid: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("uid", userid);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("uid");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
