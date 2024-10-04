import { registerDecorator, ValidationOptions } from 'class-validator';

export function EachElementLenght(validationOptions?: ValidationOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'eachElementLenght',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Array.isArray(value) && value.every((val) => typeof val === 'string' && val.trim().length > 0);
        },
        defaultMessage() {
          return 'Each element must be a non-empty string';
        },
      },
    });
  };
}
