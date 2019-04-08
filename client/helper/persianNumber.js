const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


export const persianNumber=(value)=> {
    if (value === 0) { return  '۰'; }
    if (!value) {
      return '';
    }
    return value.toString().split('').map((number) => (number === ',') ? ',' :  persianDigit(number)).join('');
  }
  const persianDigit=(digit)=> {
    if (persianNumbers.indexOf(digit) > -1) { return digit; }
    if (englishNumbers.indexOf(digit) > -1) { return persianNumbers[digit]; }
    return '';
  }

  export const numberWithoutCommas=(value)=> {
    if (value === 0) { return  '۰'; }
    if (!value) {
      return '';
    }
    const sValue= value.toString();
    return sValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .split('').map((number) => (number === ',') ? ',' : persianNumbers[number]).join('');
  }