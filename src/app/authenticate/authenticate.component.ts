import { Component, OnDestroy } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { AuthService } from '../data-access';
import { Router } from '@angular/router';
import { interval, Subject  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.sass']
})
export class AuthenticateComponent implements OnDestroy {
  
  private unSubscribe = new Subject<void>();
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuth: SocialAuthService
  ) { }

  private watcher(): void {
    this.authService.getUserData()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((user) => {
        if( user.id === '' )
          this.signOut()
      });
  }

  signInWithGoogle(role: string): void {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      if( user != null ) {
        interval(3590 * 1000).subscribe(val => this.refreshToken());
        this.authService.socialSignInSuccess(user);
        this.authService.assignRole(role);
        this.watcher();
      } else {
        this.authService.socialSignInFailed();
      }
    });
  }

  signInWithFB(role: string): void {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      if( user != null ) {
        user.photoUrl = user.response.picture.data.url;
        this.authService.socialSignInSuccess(user);
        this.authService.assignRole(role);
        this.watcher();
      } else {
        this.authService.socialSignInFailed();
      }
    })
  }

  refreshToken(): void {
    this.socialAuth.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuth?.signOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
