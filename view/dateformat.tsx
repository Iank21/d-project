export default function DateFormat(date: Date) {
  let newDate = '';

  if (date.getMonth() === 0) {
    newDate = 'янв';
  } else if (date.getMonth() === 1) {
    newDate = 'фев';
  } else if (date.getMonth() === 2) {
    newDate = 'март';
  }  else if (date.getMonth() === 3) {
    newDate = 'апр';
  }  else if (date.getMonth() === 4) {
    newDate = 'май';
  }  else if (date.getMonth() === 5) {
    newDate = 'июнь';
  }  else if (date.getMonth() === 6) {
    newDate = 'июль';
  }  else if (date.getMonth() === 7) {
    newDate = 'авг';
  }  else if (date.getMonth() === 8) {
    newDate = 'сент';
  }  else if (date.getMonth() === 9) {
    newDate = 'окт';
  }  else if (date.getMonth() === 10) {
    newDate = 'нояб';
  }  else {
    newDate = 'дек';
  } 

  return newDate;
}