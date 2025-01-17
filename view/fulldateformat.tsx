export default function FullDateFormat(date: Date) {
  let newDate = '';

  if (date.getMonth() === 0) {

    newDate = date.getDate() + '.01.' +  date.getFullYear();
  } else if (date.getMonth() === 1) {
    newDate = date.getDate() + '.02.' +  date.getFullYear();
  } else if (date.getMonth() === 2) {
    newDate = date.getDate() + '.03.' +  date.getFullYear();
  }  else if (date.getMonth() === 3) {
    newDate = date.getDate() + '.04.' +  date.getFullYear();
  }  else if (date.getMonth() === 4) {
    newDate = date.getDate() + '.05.' +  date.getFullYear();
  }  else if (date.getMonth() === 5) {
    newDate = date.getDate() + '.06.' +  date.getFullYear();
  }  else if (date.getMonth() === 6) {
    newDate = date.getDate() + '.07.' +  date.getFullYear();
  }  else if (date.getMonth() === 7) {
    newDate = date.getDate() + '.08.' +  date.getFullYear();
  }  else if (date.getMonth() === 8) {
    newDate = date.getDate() + '.09.' +  date.getFullYear();
  }  else if (date.getMonth() === 9) {
    newDate = date.getDate() + '.10.' +  date.getFullYear();
  }  else if (date.getMonth() === 10) {
    newDate = date.getDate() + '.11.' +  date.getFullYear();
  }  else {
    newDate = date.getDate() + '.12.' +  date.getFullYear();
  } 

  return newDate;
}