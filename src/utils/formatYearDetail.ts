export default function formatYearDetail(
  year: number | undefined,
  isSerial: boolean
) {
  return year && isSerial ? `c ${year}` : String(year);
}
