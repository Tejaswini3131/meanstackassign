import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(tel, args) {
    var value = tel.toString().trim().replace(/^\+/, "");

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var country, city, number;

    switch (value.length) {
      case 10: 
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11: 
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12: 
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country == 1) {
      country = "";
    }

    number = number.slice(0, 3) + "-" + number.slice(3);

    return (country + city + "-" + number).trim();
  }

}
