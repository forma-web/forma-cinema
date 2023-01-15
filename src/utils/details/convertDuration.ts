const convertDuration = (value: number) => {
  const totalMinutes = Math.floor(value / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${totalMinutes} мин ${
    hours > 0 ? `/ ${hours} ч ${minutes} мин` : ''
  }`;
};

export default convertDuration;
