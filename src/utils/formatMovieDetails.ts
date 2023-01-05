export default function formatMovieDetails(
  ...args: Array<string | (string | undefined)[] | undefined>
) {
  return args
    .flat()
    .filter((item) => typeof item === 'string')
    .map((item) => item?.toLowerCase())
    .join(', ');
}
