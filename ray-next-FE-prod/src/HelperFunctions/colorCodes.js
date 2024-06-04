export const colorCode = (nature) => {
  switch (nature?.toUpperCase()) {
    case "EXPENSE":
      return `bg-red-500 text-red-500`;
    case "ASSET":
      return `bg-lime-500 text-lime-500`;
    case "LIABILITY":
      return `bg-sky-500 text-sky-500`;
    case "INCOME":
      return `bg-yellow-400 text-yellow-500`;
    case "EQUITY":
      return `bg-violet-500 text-violet-500`;
    default:
      return `bg-red-500 text-red-500`;
  }
};
