import moment from "moment";

// Function to determine the week relationship
export function useWeekRelationship(dateToCheck) {
  const currentDate = moment();
  const startOfThisWeek = currentDate.clone().startOf("week");
  const endOfThisWeek = currentDate.clone().endOf("week");
  const startOfNextWeek = startOfThisWeek.clone().add(1, "week");
  const endOfNextWeek = endOfThisWeek.clone().add(1, "week");
  const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");
  const endOfLastWeek = endOfThisWeek.clone().subtract(1, "week");

  if (dateToCheck.isBetween(startOfThisWeek, endOfThisWeek, null, "[]")) {
    return "This Week";
  } else if (
    dateToCheck.isBetween(startOfNextWeek, endOfNextWeek, null, "[]")
  ) {
    return "Next Week";
  } else if (
    dateToCheck.isBetween(startOfLastWeek, endOfLastWeek, null, "[]")
  ) {
    return "Last Week";
  } else {
    return "Week of " + moment(dateToCheck).format("MMM D");
  }
}
