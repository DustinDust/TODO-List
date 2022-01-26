import Card from "./Card";

const Modal = (...children: Node[]) => {
  const modalContainer: HTMLDivElement = Card(...children);
  const toggleState = (): void => {
    // hide/show the modal
    modalContainer.classList.toggle("modal-showing");
  };
  return {
    content: modalContainer,
    toggle: toggleState,
  };
};

export default Modal;
