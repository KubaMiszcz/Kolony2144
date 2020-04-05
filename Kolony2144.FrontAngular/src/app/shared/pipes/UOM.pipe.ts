// import { Pipe, PipeTransform } from '@angular/core';
// import { UoMs } from 'src/app/models/enums/UOMs.enum';

// @Pipe({
//   name: 'UOMPipe'
// })
// export class UOMPipe implements PipeTransform {

//   transform(value: any, ...args: any[]): any {
    // let num = Number(parseFloat(value));
    // if (isNaN(num)) return value;

    // if (!args[0]) {
    //   if (num > 999999) return (num / 1000).toFixed(0).toString() + 'k';
    //   if (num < 1) return (num * 1000).toFixed(0).toString() + 'm';
    // }

    // else if (args[0] === UoMs.t) {
    //   if (num > 999999) return (num / 1000).toFixed(0).toString() + UoMs.kt;
    //   if (num < 1) return (num * 1000).toFixed(0).toString() + UoMs.kg;
    // }

    // else if (args[0] === UoMs.kW) {
    //   if (num > 999999) return (num / 1000).toFixed(0).toString() + UoMs.MW;
    // }
    // return value + args[0];
//     return value;
//   }
// }
