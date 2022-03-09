import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, filter, Observable, retry, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            filter(error => error instanceof HttpErrorResponse),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // refresh auth logic?
                    // or route to unauthorized?
                }
                return throwError(() => error);
            })
        );
    }

}