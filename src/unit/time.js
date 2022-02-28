export function getDate () {
  let nowYear = new Date().getFullYear(); // 当前日期
  let nowMonth = new Date().getMonth() + 1; // 当前日期
  if (nowMonth < 10) {
    nowMonth = '0' + nowMonth;
  }
  let nowDay = new Date().getDate(); // 当前日期
  if (nowDay < 10) {
    nowDay = '0' + nowDay;
  }
  let nowHour = new Date().getHours(); // 当前日期
  if (nowHour < 10) {
    nowHour = '0' + nowHour;
  }
  let nowMinute = new Date().getMinutes(); // 当前时间
  if (nowMinute < 10) {
    nowMinute = '0' + nowMinute;
  }
  let nowSec = new Date().getSeconds(); // 当前时间
  if (nowSec < 10) {
    nowSec = '0' + nowSec;
  }
  let nowWeek;
  console.log(nowWeek);
  let week = new Date().getDay(); // 当前星期
  if (week == 1) {
    nowWeek = '星期一';
  } else if (week == 2) {
    nowWeek = '星期二';
  } else if (week == 3) {
    nowWeek = '星期三';
  } else if (week == 4) {
    nowWeek = '星期四';
  } else if (week == 5) {
    nowWeek = '星期五';
  } else if (week == 6) {
    nowWeek = '星期六';
  } else {
    nowWeek = '星期日';
  }
  let time = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSec;
  return time
}

export function getDate1 () {
  let nowYear = new Date().getFullYear(); // 当前日期
  let nowMonth = new Date().getMonth() + 1; // 当前日期
  if (nowMonth < 10) {
    nowMonth = '0' + nowMonth;
  }
  let nowDay = new Date().getDate(); // 当前日期
  if (nowDay < 10) {
    nowDay = '0' + nowDay;
  }
  let nowHour = new Date().getHours(); // 当前日期
  if (nowHour < 10) {
    nowHour = '0' + nowHour;
  }
  let nowMinute = new Date().getMinutes(); // 当前时间
  if (nowMinute < 10) {
    nowMinute = '0' + nowMinute;
  }
  let nowSec = new Date().getSeconds(); // 当前时间
  if (nowSec < 10) {
    nowSec = '0' + nowSec;
  }
  let nowWeek;
  console.log(nowWeek);
  let week = new Date().getDay(); // 当前星期
  if (week == 1) {
    nowWeek = '星期一';
  } else if (week == 2) {
    nowWeek = '星期二';
  } else if (week == 3) {
    nowWeek = '星期三';
  } else if (week == 4) {
    nowWeek = '星期四';
  } else if (week == 5) {
    nowWeek = '星期五';
  } else if (week == 6) {
    nowWeek = '星期六';
  } else {
    nowWeek = '星期日';
  }
  let time = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSec;
  return time
}

