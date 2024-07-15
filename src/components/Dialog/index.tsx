import { Modal } from "../Modal";

export function Dialog() {
  return (
    <Modal isModalOpen={false} closeModal={() => ""}>
      <div>
        <p>Carregando...</p>
      </div>
    </Modal>
  );
}
