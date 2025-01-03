const getCountryFlag = (countryCode: string): string => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));

  //  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};
export default getCountryFlag;
