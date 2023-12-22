function getPreviousMonthAndYear(month, year) {
    // Create a Date object with the given month and year
    const currentDate = new Date(year, month - 1, 1);
  
    // Subtract one month from the current date
    currentDate.setMonth(currentDate.getMonth() - 1);
  
    // Get the previous month and year
    const previousMonth = currentDate.getMonth() + 1;
    const previousYear = currentDate.getFullYear();
  
    return {
        previousMonth: previousMonth,
        previousYear: previousYear
    };
  }
  
  module.exports = {
    getPreviousMonthAndYear: getPreviousMonthAndYear,
}
//   }
//   // Usage example
//   const currentMonth = 1;
//   const currentYear = 2023;
//   const previousMonthAndYear = getPreviousMonthAndYear(currentMonth, currentYear);
  
//   console.log(previousMonthAndYear)
//   console.log(previousMonthAndYear.month); // Output: 11
//   console.log(previousMonthAndYear.year); // Output: 2023