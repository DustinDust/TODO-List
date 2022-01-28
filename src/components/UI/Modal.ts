import Card from './Card';

const Modal = (...children: Node[]) => {
  const dropBack: HTMLDivElement = document.createElement('div');
  dropBack.classList.add('drop-back');
  const modalContent: HTMLDivElement = Card(...children);
  modalContent.classList.add('modal-container');
  const show = () => {
    document.body.appendChild(modalContent);
    document.body.appendChild(dropBack);
  };
  const clear = () => {
    dropBack.remove();
    modalContent.remove();
  };
  dropBack.addEventListener('click', () => {
    modalContent.remove();
    dropBack.remove();
  });

  return {
    modalContent,
    show,
    clear,
  };
};

export default Modal;
