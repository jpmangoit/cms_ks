import { HttpInterceptorFn } from '@angular/common/http';

//functional intercaptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('token');
  if(token!=null){
    const authReq=req.clone({
      headers: req.headers.append('Authorization',token)
    });
    return next(authReq);

  }
  return next(req);
};
