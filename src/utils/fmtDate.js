export const fmtDate = (d) => {
  const dd = new Date(d);
  const day = String(dd.getDate()).padStart(2, "0");
  const mon = String(dd.getMonth() + 1).padStart(2, "0");
  const year = dd.getFullYear();
  return `${day}.${mon}.${year}`;
};
