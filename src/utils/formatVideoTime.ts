const formatVideoTime = (time: number) => {
  if (isNaN(time)) time = 0;
  const isNegative = time < 0 ? '-' : '';
  const seconds = Math.trunc(Math.abs(time));
  const minutes = Math.trunc(seconds / 60);
  const hours = Math.trunc(minutes / 60);

  const formattedTime = [
    hours !== 0 ? hours : null,
    minutes % 60,
    seconds % 60,
  ];

  return `${isNegative}${formattedTime
    .filter((el) => el !== null)
    .map((el, index) =>
      index !== 0 ? String(el).padStart(2, '0') : String(el)
    )
    .join(':')}`;
};

export default formatVideoTime;
