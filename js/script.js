// get the inputs
const daysInput = document.getElementById("day");
const monthsInput = document.getElementById("month");
const yearsInput = document.getElementById("year");

// Limit the input field to 2 characters
function limitInputLength(inputElement, maxLength) {
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}

daysInput.addEventListener("input", limitInputLength.bind(null, daysInput, 2));
monthsInput.addEventListener("input", limitInputLength.bind(null, monthsInput, 2));
yearsInput.addEventListener("input", limitInputLength.bind(null, yearsInput, 4));

// add 0 to the start of the number if only one one character
daysInput.addEventListener("blur", addLeadingZero);
monthsInput.addEventListener("blur", addLeadingZero);
function addLeadingZero(event) {
    const inputElement = event.target;
    if (inputElement.value.length === 1 && inputElement.value > 0 ) {
        inputElement.value = inputElement.value.padStart(2, '0');
    }
}

// get the form labels so you can change them on error
const dayText = document.getElementById("dayText");
const monthText = document.getElementById("monthText");
const yearText = document.getElementById("yearText");

// submit for function
function handleOnSubmit() {
    const days = daysInput.value.padStart(2, '0');
    const months = monthsInput.value.padStart(2, '0');
    const years = yearsInput.value;

    const daysError = document.getElementById("daysError");
    const monthsError = document.getElementById("monthsError");
    const yearsError = document.getElementById("yearsError");

    daysError.textContent = "";
    monthsError.textContent = "";
    yearsError.textContent = "";

    // check to ensure that the input doesn't contain more days than required
    function isFieldEmpty(inputElement) {
    return inputElement.value.trim() === "";
}

if (isFieldEmpty(daysInput)) {
    daysError.textContent = "Required field";
    daysInput.style.borderColor = "red";
    dayText.style.color="red"

    return;
} else if (isNaN(days) || days.length > 2 || days < 1 || days > 31) {
    daysError.textContent = "Must be a valid day.";
    daysInput.style.borderColor = "red"; 
    dayText.style.color="red"
    return;
}

if (isFieldEmpty(monthsInput)) {
    monthsError.textContent = "Required field";
    monthsInput.style.borderColor = "red";
    monthText.style.color = "red";
    
    return;
} else if (!months || isNaN(months) || months.length > 2 || months < 1 || months > 12) {
    monthsError.textContent = "Must be a valid month.";
    monthsInput.style.borderColor = "red"; 
    monthText.style.color = "red";

    return;
}

if (isFieldEmpty(yearsInput)) {
    yearsError.textContent = "Required field";
    yearsInput.style.borderColor = "red";
    yearText.style.color = "red";
    
    return;
} else if (!years || isNaN(years) || years > new Date().getFullYear()) {
    yearsError.textContent = "Must be in the past.";
    yearsInput.style.borderColor = "red"; 
    yearText.style.color = "red";

    return;
}

 
    const lastDayOfMonth = new Date(years, months, 0).getDate();
    if (days > lastDayOfMonth) {
        daysError.textContent = "Must be a valid day.";
        dayText.style.color = "red";

        return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (years > currentYear) {
        alert("Year cannot be greater than the current year.");
        return;
    }

    const formattedDate = moment(`${years}-${months}-${days}`, "YYYY-MM-DD").format("DD/MM/YYYY");
    console.log(`Formatted Date: ${formattedDate}`);

    const age = calculateAge(formattedDate);
    updateAgeDisplay(age);

    // claer input after saving
    daysInput.value = "";
    monthsInput.value = "";
    yearsInput.value = "";
   

    daysInput.style.borderColor = "";
    monthsInput.style.borderColor = "";
    yearsInput.style.borderColor = "";
    dayText.style.color = "";
    monthText.style.color = "";
    yearText.style.color = "";

}

// calculate the age from the date provided
function calculateAge(birthDate) {
    const currentDate = moment();
    const birthMoment = moment(birthDate, "DD/MM/YYYY");

    const yearsDiff = currentDate.diff(birthMoment, 'years');
    birthMoment.add(yearsDiff, 'years');

    const monthsDiff = currentDate.diff(birthMoment, 'months');
    birthMoment.add(monthsDiff, 'months');

    const daysDiff = currentDate.diff(birthMoment, 'days');

    return { years: yearsDiff, months: monthsDiff, days: daysDiff };
}
// store in the local storage
const storedAge = loadAgeFromLocalStorage();
    if (storedAge) {
        updateAgeDisplay(storedAge);
    }

// display the calculated age
function updateAgeDisplay(age) {
    const ageYears = document.getElementById("ageInYears");
    const ageMonths = document.getElementById("ageInMonths");
    const ageDays = document.getElementById("ageInDays");

    ageYears.textContent = age.years;
    ageMonths.textContent = age.months;
    ageDays.textContent = age.days;

    // call the function to save age
    saveAgeToLocalStorage(age);

}

// save age to local storage
function saveAgeToLocalStorage(age) {
    localStorage.setItem("calculatedAge", JSON.stringify(age));
}
// display data from storage
function loadAgeFromLocalStorage() {
    const storedAge = localStorage.getItem("calculatedAge");
    return storedAge ? JSON.parse(storedAge) : null;
}
// clear the displayed age in the UI
function clearAgeDisplay() {
    const ageYears = document.getElementById("ageInYears");
    const ageMonths = document.getElementById("ageInMonths");
    const ageDays = document.getElementById("ageInDays");

    ageYears.textContent = "--";
    ageMonths.textContent = "--";
    ageDays.textContent = "--";
}
// clear local storage
function clearLocalStorage() {
    localStorage.removeItem("calculatedAge");
    // clear the displayed age
    clearAgeDisplay();
    
}