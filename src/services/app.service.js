export const formatDate = date => {
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${day}/${month} ${hour}:${min}`;
};
