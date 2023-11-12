export const convertSeconds = (seconds: number): string => {
  let minuts = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  return `${minuts.toString().padStart(2, '0')}:${secondsLeft
    .toString()
    .padStart(2, '0')}`;
};
