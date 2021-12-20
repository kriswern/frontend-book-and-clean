class DateService {
  //Atleast twelve hours newer than the current date
  isDateNewer = (date, hours) => {
    const difference = 1000 * 60 * 60 * hours;
    const now = Date.now() + difference;
    const bookingDate = Date.parse(date);
    return bookingDate > now ? true : false;
  };
}

export default new DateService();
