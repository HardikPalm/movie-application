import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseType } from "./responseType.dto";



const IgnoredPropertyName = Symbol("IgnoredPropertyName");

export function ResponseInterceptorIgnore() {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value[IgnoredPropertyName] = true;
  };
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseType<T>> {
    const isIgnored = context.getHandler()[IgnoredPropertyName];
    if (isIgnored) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data?.message ? data?.message : 'Success',
        data: data?.data ? data?.data : data,
        meta: data?.meta ? data?.meta : null
      }))
    );
  }
}
