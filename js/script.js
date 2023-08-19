// get the inputs
const daysInput = document.getElementById("day");
const monthsInput = document.getElementById("month");
const yearsInput = document.getElementById("year");

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
    return;
} else if (isNaN(days) || days.length > 2 || days < 1 || days > 31) {
    daysError.textContent = "Must be a valid day.";
    daysInput.style.borderColor = "red"; 
    return;
}

if (isFieldEmpty(monthsInput)) {
    monthsError.textContent = "Required field";
    monthsInput.style.borderColor = "red";
    return;
} else if (!months || isNaN(months) || months.length > 2 || months < 1 || months > 12) {
    monthsError.textContent = "Must be a valid month.";
    monthsInput.style.borderColor = "red"; 
    return;
}

if (isFieldEmpty(yearsInput)) {
    yearsError.textContent = "Required field";
    yearsInput.style.borderColor = "red";
    return;
} else if (!years || isNaN(years) || years > new Date().getFullYear()) {
    yearsError.textContent = "Must be in the past.";
    yearsInput.style.borderColor = "red"; 
    return;
}

    // if (!days ||isNaN(days) || days.length > 2 || days < 1 || days > 31) {
    //     daysError.textContent = "Must be a valid day.";
    //     daysInput.style.borderColor = "red"; 
    //     return;
    // }

   
    // if (!months || isNaN(months) || months.length > 2 || months < 1 || months > 12) {
    //     monthsError.textContent = "Must be a valid month.";
    //     monthsInput.style.borderColor = "red"; 

    //     return;
    // }

    // if (!years || isNaN(years) || years > (new Date().getFullYear())) {
    //     yearsError.textContent = "Must be in the past.";
    //     yearsInput.style.borderColor = "red"; 

    //     return;
    // }

    const lastDayOfMonth = new Date(years, months, 0).getDate();
    if (days > lastDayOfMonth) {
        daysError.textContent = "Must be a valid day.";
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
    monthsInput.style.borderColor = "green";
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


function loadAgeFromLocalStorage() {
    const storedAge = localStorage.getItem("calculatedAge");
    return storedAge ? JSON.parse(storedAge) : null;
}