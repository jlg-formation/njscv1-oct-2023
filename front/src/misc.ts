export const querySelector = (selector: string): HTMLElement => {
  const result = document.querySelector(selector);
  if (result === null) {
    throw new Error(`Cannot find selector ${selector}`);
  }
  return result as HTMLElement;
};
