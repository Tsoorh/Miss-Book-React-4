export function Modal({ children,onCloseModal}) {
  


  return (
    <section className="modal-backdrop" onClick={()=>{onCloseModal()}}>
      <section className="modal-container">
        <button onClick={()=>{onCloseModal()}} className="x-modal">
          x
        </button>
        <div className="modal-content">{children}</div>
      </section>
    </section>
  );
}
