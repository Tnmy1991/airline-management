import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './data-access';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  private unSubscribe = new Subject<void>();

  constructor(
    private router: Router, 
    private authService: AuthService, 
  ) { }

  ngOnInit() {
    this.authService.getUserRole()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((res) => {
        if(res === 'admin') {
          this.router.navigate(['/application/admin']);
        } else if(res === 'staff') {
          this.router.navigate(['/application/check-in']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
