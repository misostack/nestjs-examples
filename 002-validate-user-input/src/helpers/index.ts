export function dateIsValid(val: string) {
  // date format: DD-MM-YYYY
  const dateSegments = val.split('-').map((s) => parseInt(s));
  const [date, month, year] = dateSegments;
  const d = new Date(year, month - 1, date);
  if (typeof d === 'object' && d !== null && typeof d.getTime === 'function') {
    // check valid date range

    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === date
    );
  }

  return false;
}
