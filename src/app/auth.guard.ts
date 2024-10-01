import { CanActivateFn, Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
