export const mathSign = (num: number): string => {
  if(Math.sign(num) !== -1 || -0){
    return '+';
  }else {
    return '';
  };
};

