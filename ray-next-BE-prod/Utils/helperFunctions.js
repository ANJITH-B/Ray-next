module.exports.DateAdderFunction = (issuingDate, limitDays) => {
  // Parse the issuing date string into a JavaScript Date object
  const date = new Date(issuingDate);

  // Add the specified number of days to the date
  date.setDate(date.getDate() + limitDays);

  // Get the year, month, and day components separately
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Construct the result date string in the desired format
  const resultDateString = `${year}-${month}-${day}T${date.toTimeString().split(' ')[0]}.000Z`;

  return resultDateString;
}