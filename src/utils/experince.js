// utils/experience.js

export const getExperienceYears = () => {
  // Your joining date
  const joiningDate = new Date(2023, 11, 25); // Dec 25, 2023
  const today = new Date();

  let months =
    (today.getFullYear() - joiningDate.getFullYear()) * 12 +
    (today.getMonth() - joiningDate.getMonth());

  // Only increase after the 25th of the month
  if (today.getDate() < 25) {
    months--;
  }

  months = Math.max(0, months);

  // Convert months to years (1 decimal)
  return (months / 12).toFixed(1);
};
