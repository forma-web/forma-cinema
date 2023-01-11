const formatVideoTime = (time: number) => {
  const seconds = Math.trunc(time);
  const minutes = Math.trunc(seconds / 60);
  const hours = Math.trunc(minutes / 60);

  const formattedTime = [
    hours !== 0 ? hours : null,
    minutes % 60,
    seconds % 60,
  ];

  return formattedTime
    .filter((el) => el !== null)
    .map((el, index) =>
      index !== 0 ? String(el).padStart(2, '0') : String(el)
    )
    .join(':');
};

export default formatVideoTime;
