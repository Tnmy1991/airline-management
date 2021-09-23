import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../data-access';
import { MediaMatcher } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  public email: string = '';
  public photoUrl: string = '';
  public userRole: string = '';
  public firstName: string = '';
  public loggedIn: boolean = false;
  public mobileQuery: MediaQueryList;
  
  private unSubscribe = new Subject<void>();
  private _mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher, 
    private authService: AuthService, 
    private changeDetectorRef: ChangeDetectorRef, 
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.getUserData()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((user) => {
        if( user.id !== '' ) {
          this.email = user.email;
          this.photoUrl = user.photoUrl;
          this.firstName = user.firstName;
          this.userRole = user.role
          this.loggedIn = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.authService.socialSignOut();
  }

}

