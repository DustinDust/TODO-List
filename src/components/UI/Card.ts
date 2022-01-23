const Card = (...children: Node[]): HTMLDivElement => {
  const cardContainer: HTMLDivElement = document.createElement('div');
  for (const node of children) {
    cardContainer.appendChild(node);
  }
  return cardContainer;
};

export default Card;
