class DateService {

  //Atleast twelve hours newer than the current date
  isDateNewer = (date) => {
    const twelveHours = 1000 * 60 * 60 * 12;
    const now = Date.now() + twelveHours;
    const bookingDate = Date.parse(date);
    return bookingDate > now ? true : false;
  };
}

export default new DateService();
