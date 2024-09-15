/**
 * This function will scroll to given element
 * @param id
 */
const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default scrollToElement;
