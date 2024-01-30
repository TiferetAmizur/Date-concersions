/**
 * Formats a Date object into a string based on the specified format.
 * @param {Date} date - The Date object to be formatted.
 * @param {string} stringFormat - The desired format of the output string.
 *        Supported formats are: "YYYY-MM-DD", "YYYY/MM/DD", "YYYY.MM.DD",
 *        "DD-MM-YYYY", "DD/MM/YYYY", "DD.MM.YYYY", "DD/MM/YYYY hh:mm:ss",
 *        "hh:mm".
 * @returns {string} The formatted date string.
 * @throws {Error} Throws an error if an invalid date format is provided.
 */
export function formatDate(date, stringFormat) {
  try {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm_month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    let hh = String(date.getHours()).padStart(2, "0");
    let mm_minutes = String(date.getMinutes()).padStart(2, "0");
    let ss = String(date.getSeconds()).padStart(2, "0");

    let formattedDate;

    switch (stringFormat) {
      case "YYYY-MM-DD":
        formattedDate = yyyy + "-" + mm_month + "-" + dd;
        break;

      case "YYYY/MM/DD":
        formattedDate = yyyy + "/" + mm_month + "/" + dd;
        break;

      case "YYYY.MM.DD":
        formattedDate = yyyy + "." + mm_month + "." + dd;
        break;

      case "DD-MM-YYYY":
        formattedDate = dd + "-" + mm_month + "-" + yyyy;
        break;

      case "DD/MM/YYYY":
        formattedDate = dd + "/" + mm_month + "/" + yyyy;
        break;

      case "DD.MM.YYYY":
        formattedDate = dd + "." + mm_month + "." + yyyy;
        break;

      case "DD/MM/YYYY hh:mm:ss":
        formattedDate =
          dd +
          "/" +
          mm_month +
          "/" +
          yyyy +
          " " +
          hh +
          ":" +
          mm_minutes +
          ":" +
          ss;
        break;

      case "hh:mm":
        formattedDate = hh + ":" + mm_minutes;
        break;

      default:
        throw new Error(
          "Error formatDate: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD, DD/MM/YYYY hh:mm:ss, hh:mm",
        );
        throw err;
        break;
    }

    return formattedDate;
  } catch (error) {
    error.message = "Error formatDate: " + error.message;
    throw error;
  }
}

/**
 * Formats a date string into the specified format.
 * @param {string} dateString - The date string to format.
 * @param {string} stringFormat - The desired format of the output string.
 *        Supported formats are: "YYYY-MM-DD", "YYYY/MM/DD", "YYYY.MM.DD",
 *        "DD-MM-YYYY", "DD/MM/YYYY", "DD.MM.YYYY".
 * @returns {string} The formatted date string.
 * @throws {Error} Throws an error if the date string is not in a valid format or if the format is unsupported.
 */
export function formatDateFromString(dateString, stringFormat) {
  try {
    // Array of possible date formats to try
    const possibleDateFormats = [
      "YYYY-MM-DD",
      "YYYY/MM/DD",
      "YYYY.MM.DD",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "DD.MM.YYYY",
    ];

    let date;
    let format;

    // Try parsing the date string using different formats
    for (format of possibleDateFormats) {
      // date = parseDate(dateString, format);
      date = isValidDateString(dateString, format);
      if (date) break;
    }

    if (!date) {
      throw new Error(
        "Error formatDateFromString: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD",
      );
    }

    let dateObj = dateStringToDateObject(dateString, format);

    if (!dateObj) {
      throw new Error("Error formatDateFromString: Invalid date");
    }

    // Format the parsed date using the specified string format
    let formattedDate = formatDate(dateObj, stringFormat);

    return formattedDate;
  } catch (error) {
    error.message = "Error formatDateFromString: " + error.message;
    throw error;
  }
}

/**
 * Checks if a given date string matches the specified format and represents a valid date.
 * @param {string} dateString - The date string to validate.
 * @param {string} stringFormat - The expected format of the date string.
 *        Supported formats are: "DD.MM.YYYY", "DD/MM/YYYY", "DD-MM-YYYY",
 *        "YYYY.MM.DD", "YYYY/MM/DD", "YYYY-MM-DD".
 * @returns {boolean} True if the date string is in the specified format and represents a valid date; otherwise, false.
 * @throws {Error} Throws an error if an invalid date format is provided.
 */
function isValidDateString(dateString, stringFormat) {
  try {
    let dateRegex;
    switch (
      stringFormat // Check if the string matches the 'dd.mm.yyyy' or 'd.mm.yyyy' format using a regular expression
    ) {
      case "DD.MM.YYYY":
        dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
        break;

      case "DD/MM/YYYY":
        dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        break;

      case "DD-MM-YYYY":
        dateRegex = /^(\d{1,2})\-(\d{1,2})\-(\d{4})$/;
        break;

      case "YYYY.MM.DD":
        dateRegex = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/;
        break;

      case "YYYY/MM/DD":
        dateRegex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
        break;

      case "YYYY-MM-DD":
        dateRegex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
        break;

      default:
        throw new Error(
          "Error isValidDateString: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD",
        );
    }

    const match = dateString.match(dateRegex);

    if (!match) {
      return false; // Not a valid format
    }

    let day;
    let month;
    let year;
    switch (
      stringFormat // Extract the day, month, and year from the matched groups
    ) {
      case "DD.MM.YYYY":
      case "DD/MM/YYYY":
      case "DD-MM-YYYY":
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10) - 1; // Month is zero-based in JavaScript Date object
        year = parseInt(match[3], 10);
        break;

      case "YYYY.MM.DD":
      case "YYYY/MM/DD":
      case "YYYY-MM-DD":
        day = parseInt(match[3], 10);
        month = parseInt(match[2], 10) - 1; // Month is zero-based in JavaScript Date object
        year = parseInt(match[1], 10);
        break;

      default:
        throw new Error(
          "Error isValidDateString: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD",
        );
    }

    // Create a Date object and check if it's a valid date
    const dateObject = new Date(year, month, day);
    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month &&
      dateObject.getDate() === day
    );
  } catch (error) {
    error.message = "Error isValidDateString: " + error.message;
    throw error;
  }
}
// Example usage:
// try {
//     console.log(isValidDateString('25.12.2022', 'dd.mm.yyyy'));  // Output: true
//     console.log(isValidDateString('5/7/2023', 'dd/mm/yyyy'));     // Output: true
//     console.log(isValidDateString('31.02.2023', 'dd.mm.yyyy'));   // Output: false (invalid date)
//     console.log(isValidDateString('abc/def/ghi', 'dd/mm/yyyy'));   // Output: false (invalid format)
// } catch (error) {
//     console.error(error.message);
// }

/**
 * Converts a valid date string into a JavaScript Date object.
 * @param {string} dateString - The date string to convert.
 * @param {string} stringFormat - The format of the date string. Supported formats are:
 *        "DD.MM.YYYY", "DD/MM/YYYY", "DD-MM-YYYY", "YYYY.MM.DD", "YYYY/MM/DD", "YYYY-MM-DD".
 * @returns {Date|false} A Date object representing the parsed date string, or false if the date string is not in a valid format.
 * @throws {Error} Throws an error if an invalid date format is provided.
 */
function dateStringToDateObject(dateString, stringFormat) {
  try {
    let dateRegex;
    switch (
      stringFormat // Check if the string matches the 'dd.mm.yyyy' or 'd.mm.yyyy' format using a regular expression
    ) {
      case "DD.MM.YYYY":
        dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
        break;

      case "DD/MM/YYYY":
        dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        break;

      case "DD-MM-YYYY":
        dateRegex = /^(\d{1,2})\-(\d{1,2})\-(\d{4})$/;
        break;

      case "YYYY.MM.DD":
        dateRegex = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/;
        break;

      case "YYYY/MM/DD":
        dateRegex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
        break;

      case "YYYY-MM-DD":
        dateRegex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
        break;

      default:
        throw new Error(
          "Error dateStringToDateObject: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD",
        );
    }

    const match = dateString.match(dateRegex);

    if (!match) {
      return false; // Not a valid format
    }

    let day;
    let month;
    let year;
    switch (
      stringFormat // Extract the day, month, and year from the matched groups
    ) {
      case "DD.MM.YYYY":
      case "DD/MM/YYYY":
      case "DD-MM-YYYY":
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10) - 1; // Month is zero-based in JavaScript Date object
        year = parseInt(match[3], 10);
        break;

      case "YYYY.MM.DD":
      case "YYYY/MM/DD":
      case "YYYY-MM-DD":
        day = parseInt(match[3], 10);
        month = parseInt(match[2], 10) - 1; // Month is zero-based in JavaScript Date object
        year = parseInt(match[1], 10);
        break;

      default:
        throw new Error(
          "Error dateStringToDateObject: Invalid date format. Supported formats are: DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY, YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD",
        );
    }

    // Create a Date object
    const dateObject = new Date(year, month, day);
    return dateObject;
  } catch (error) {
    error.message = "Error dateStringToDateObject: " + error.message;
    throw error;
  }
}

// Example usage:
// try {
//     const formattedDate = formatDateFromString("25.01.2024", "YYYY/MM/DD");
//     console.log(formattedDate); // Output: "2024/01/25"
// } catch (error) {
//     console.error(error.message);
// }
