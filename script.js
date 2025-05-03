let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0]; // Set max date to today
let result = document.getElementById("result");

function calculateAge() {
    let birthDate = new Date(userInput.value); // Create Date object from input
    
    if (isNaN(birthDate.getTime())) { // Check if date is valid
        result.innerHTML = "Please enter a valid date";
        return;
    }
    
    let today = new Date();
    
    // Extract date components
    let birthDay = birthDate.getDate();
    let birthMonth = birthDate.getMonth() + 1; // Months are 0-indexed
    let birthYear = birthDate.getFullYear();
    
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
    
    let ageYears, ageMonths, ageDays;
    
    // Calculate years
    ageYears = currentYear - birthYear;
    
    // Calculate months
    if (currentMonth >= birthMonth) {
        ageMonths = currentMonth - birthMonth;
    } else {
        ageYears--;
        ageMonths = 12 + currentMonth - birthMonth;
    }
    
    // Calculate days
    if (currentDay >= birthDay) {
        ageDays = currentDay - birthDay;
    } else {
        ageMonths--;
        ageDays = getDaysInMonth(birthYear, birthMonth) + currentDay - birthDay;
        
        if (ageMonths < 0) {
            ageMonths = 11;
            ageYears--;
        }
    }
    
    // Handle pluralization
    const yearsText = ageYears === 1 ? "year" : "years";
    const monthsText = ageMonths === 1 ? "month" : "months";
    const daysText = ageDays === 1 ? "day" : "days";
    
    result.innerHTML = `You are ${ageYears} ${yearsText}, ${ageMonths} ${monthsText} and ${ageDays} ${daysText} old`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // Gets last day of previous month
}

// Add event listener if needed
document.querySelector("button").addEventListener("click", calculateAge);