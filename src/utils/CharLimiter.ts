const charLimiter = (value: string, max: number) => {
  if (value.length > max) {
    value = value.substr(0, max);
  }
  let remaining: number = max - value.length;

  return {
    value,
    remaining,
  };
};

export default charLimiter;
