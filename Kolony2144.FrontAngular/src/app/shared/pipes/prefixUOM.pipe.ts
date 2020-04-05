import { Pipe, PipeTransform } from '@angular/core';
import { UoMs } from 'src/app/models/enums/UOMs.enum';

@Pipe({
  name: 'prefixUOMPipe'
})
export class prefixUOMPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) return value;
    let val = value.toString();

    let lead = Number(parseFloat(val));
    if (isNaN(lead)) return value
    // let trail = val.slice(lead.toString().length, val.length);

    // // console.log(val + ' ' + lead + ' ' + trail);

    // let fraction = !args[0] ? 3 : args[0];
    // let sLead = '';
    // let separator = '  ';
    // let divider = 1;
    // let prefixUOM = ' ';

    // if (Math.abs(lead) > 999999999999) {    //Giga
    //   divider = 1000000000;
    //   prefixUOM += 'G';
    // }
    // else if (Math.abs(lead) > 999999999) {    //Mega
    //   divider = 1000000;
    //   prefixUOM += 'M';
    // }

    // else if (Math.abs(lead) > 999999) {//kilo
    //   divider = 1000;
    //   prefixUOM += 'k';
    // }

    // sLead = (lead / divider).toFixed(fraction);
    // let parts = sLead.split('.');
    // let len = parts[0].length;
    // sLead = parts[0].substring(len - 3, len);
    // sLead = parts[0].substring(len - 6, len - 3) + separator + sLead;
    // sLead = parts[0].substring(len - 9, len - 6) + separator + sLead;
    // sLead + (!parts[1] ? '' : ('.' + parts[1]));
    // return sLead + prefixUOM + trail;

    return (+value).toFixed(1);

  }
}

// else if (Math.abs(lead) > 999999999) return (lead / 1000000).toLocaleString('fr-FR', { minimumFractionDigits: fraction, maximumFractionDigits: fraction }).replace(',', '.') + 'M' + trail;//Mega
// else if (Math.abs(lead) > 999999) return (lead / 1000).toLocaleString('fr-FR', { minimumFractionDigits: fraction, maximumFractionDigits: fraction }).replace(',', '.') + 'k' + trail;//kilo
