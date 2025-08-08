import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProfile } from '../store';
import { catchError, map, of } from 'rxjs';
import { ProfileService } from './profile/profile.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(ProfileService);
  const store = inject(Store);

  return service.getProfile().pipe(
    map(res => {
      if (res) {
        store.dispatch(getProfile({ profileDetails: res }));
        return true;
      }
      router.navigate(['/'])
      return false;
    }),
    catchError(error => {
      console.log(error);
      router.navigate(['/'])
      return of(false);
    })
  )
};
