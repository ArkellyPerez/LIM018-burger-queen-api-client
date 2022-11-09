import './modal.css'

export const ModalError = () => {
    function cerrarModal(){
        const modalPage = document.getElementById("modalPage2")
        return modalPage.style.display = 'none';
    }
    return ( 
        <div className="Modal2" id="modalPage2">
             <div className="ModalWindow">
                <img className="imgError" src="https://jaguar.wwfbolivia.org/theme/front/img/wrong.gif" alt="checkmark" />
                <h1 className="messageModal" id="messageModal">Complete todos los campos</h1>
                <input type="submit" className="btnEnviar" onClick={cerrarModal} value="OK"></input>
            </div>
        </div>
     )
}
