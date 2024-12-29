export const getCurrentDate = () => {
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const date = new Date();
  return date.toLocaleDateString("en-US", options);
};
