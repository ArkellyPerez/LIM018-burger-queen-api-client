import './modal.css'

export const Modal = () => {
    function cerrarModal(){
        const modalPage = document.getElementById("modalPage")
        return modalPage.style.display = 'none';
    }
    return ( 
        <div className="Modal" id="modalPage">
             <div className="ModalWindow">
                {/* <img className="imgOK" src="https://media.tenor.com/BSY1qTH8g-oAAAAM/check.gif" alt="checkmark" /> */}
                <img className="imgOK" src="https://media.tenor.com/HBFSE4j6LdcAAAAM/derp.gif" alt="checkmark" />

                
                {/* <img className="imgOK" src="https://uploads-ssl.webflow.com/5c82eb34b2a8336bb02d58a4/5c96910811cd0d08ab7d1816_finallsuccess.gif" alt="checkmark" /> */}
                <h1 className="messageModal" id="messageModal">Poceso realizado exitosamente</h1>
                <input type="submit" className="btnEnviar" onClick={cerrarModal} value="OK"></input>
            </div>
        </div>
     )
    // }else if(gif==="ERROR"){
    //     return ( 
    //         <div className="Modal" id="modalPage">
    //             <div className="ModalWindow">
    //             <h1>{message}</h1>
    //             <img className="imgOK" src="https://www.sigmatecnologias.com.mx/images/exitosamente.gif" alt="checkmark" />
    //             </div>
    //         </div>
    //      )
    // }
}
