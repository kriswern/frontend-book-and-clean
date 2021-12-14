class DateService {

  //Atleast twelve hours newer than the current date
  isDateNewer = (date) => {
    const twelveHours = 1000 * 60 * 60 * 12;
    const now = Date.now();
    const bookingDate = Date.parse(date) + twelveHours;
    return bookingDate > now ? true : false;
  };
}

export default new DateService();
