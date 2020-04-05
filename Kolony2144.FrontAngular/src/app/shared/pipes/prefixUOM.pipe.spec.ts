import { prefixUOMPipe } from "./prefixUOM.pipe";

describe('prefixUOMPipe', () => {
  let localSpace = String.fromCharCode((1000).toLocaleString('fr-FR').charCodeAt(1));

  it('create an instance', () => {
    const pipe = new prefixUOMPipe();
    expect(pipe).toBeTruthy();
  });

  it('99111 = 99 111', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '99111';
    let args = [0];

    //act
    let actual = pipe.transform(input, args);

    //assert
    expect(actual).toEqual('99' + localSpace + '111');
  });

  it('1999111 = 1 999.1k', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '1999111';

    //act
    let actual = pipe.transform(input);

    //assert
    expect(actual).toEqual('1' + localSpace + '999.1k');
  });

  it('1999111333 = 1 999.1M', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '1999111333';

    //act
    let actual = pipe.transform(input);

    //assert
    expect(actual).toEqual('1' + localSpace + '999.1M');
  });

  it('1999111333 = 1 999.11M', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '1999111333';
    let args = [2];

    //act
    let actual = pipe.transform(input, args);

    //assert
    expect(actual).toEqual('1' + localSpace + '999.11M');
  });

  it('1999111t = 1 999.1kt', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '1999111t';

    //act
    let actual: string = pipe.transform(input);

    //assert
    expect(actual).toBe('1' + localSpace + '999.1kt');
  });

  it('1999111W = 1 999.1kW', () => {
    //assign
    const pipe = new prefixUOMPipe();
    let input = '1999111W';

    //act
    let actual = pipe.transform(input);

    //assert
    expect(actual).toEqual('1' + localSpace + '999.1kW');
  });

});
