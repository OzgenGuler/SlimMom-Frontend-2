export const getGMT3Time = () => {
  // Şu anki UTC zamanı al
  //   const now = new Date();

  // GMT+3 için offset ekle (3 saat = 180 dakika = 10800000 ms)
  const gmt3 = new Date();

  return gmt3;
};

console.log(getGMT3Time());
