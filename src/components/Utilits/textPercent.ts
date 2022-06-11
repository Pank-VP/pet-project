import '../../index.scss';

export const textPercent = (num: number) => {
  if(Math.sign(num) === -1 || -0) {
    return 'red';
  } else {
    return 'green';
  };
};
