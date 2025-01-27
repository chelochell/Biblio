export const getMonthAndYear = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear().toString();
  return { month, year };
};