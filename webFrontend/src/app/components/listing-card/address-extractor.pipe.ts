import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressExtractor',
  standalone: true
})
export class AddressExtractorPipe implements PipeTransform {

  transform(value: string, extractStreetAddress: boolean): string {
    if (!value) return '';

    const addressParts = value.split(' ');
    if (extractStreetAddress) {
      return addressParts.slice(0, addressParts.length - 2).join(' ');
    } else {
      return addressParts.slice(addressParts.length - 2).join(' ');
    }
  }

}
