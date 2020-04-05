// import { Pipe, PipeTransform } from '@angular/core';
// import { tryParse } from 'selenium-webdriver/http';

// @Pipe({
//   name: 'prefixUOMPipe'
// })
// export class sprefixUOMPipe implements PipeTransform {

//   transform(value: any, ...args: any[]): any {
//     args[0] = 1;

//     //todo change to my pipe transform numbers and add trailing string eg Uoms
//     let num = Number(value);
//     if (isNaN(num)) return value;
//     num = value.toFixed(args[0]);
//     let parts = num.toString().split('.');

//     let len = parts[0].length;
//     let result = parts[0].substring(len - 3, len);
//     result = parts[0].substring(len - 6, len - 3) + ' ' + result;
//     result = parts[0].substring(len - 9, len - 6) + ' ' + result;
//     return result + (!parts[1] ? '' : ('.' + parts[1]));


//     // parseFloat("123.456").toFixed(2);
//     // return isNaN(total) ? 'n/a' : total;
//   }
// }
