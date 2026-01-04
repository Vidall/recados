import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

Injectable();
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue))
      throw new Error('Validation failed: ID must be an integer');

    if (parsedValue < 1)
      throw new Error('Validation failed: ID must be a positive integer');

    return value;
  }
}
