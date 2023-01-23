import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AuthorsSelect } from "./AuthorsDropdown";

export function BookModal(props: any){
  
    return(
        <Modal isOpen={props.modalEdit}>
            <ModalHeader>Editar Livro</ModalHeader>
                    
            <ModalBody>
                <div className='form-group'>
                    <input type="number" hidden name='id' value={props.bookSelected && props.bookSelected.id}/>
                    <label>Isbn:</label>
                    <input type="number" className='form-control' name='isbn' required onChange={props.handleChange} value={props.bookSelected && props.bookSelected.isbn} />
                    <br/>
                    <label>Nome:</label>
                    <input type="text" className='form-control' name='name'required onChange={props.handleChange} value={props.bookSelected && props.bookSelected.name} /><br/>
                    <label>Autor:</label> <br />
                    <AuthorsSelect 
                        onChange={props.handleChange}
                        authorId = {props.bookSelected.authorId}
                    />
                    <br/>
                    <label>Preço:</label>
                    <br/>
                    <input type="number" className='form-control'  name='price' required onChange={props.handleChange} value={props.bookSelected && props.bookSelected.price} /><br/>
                    <label>Imagem:</label>
                    <br/>
                    <input type="url" className='form-control' pattern="https://.*"  name='image'  onChange={props.handleChange}  value={props.bookSelected && props.bookSelected.image}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button id='btn-edit' className='btn btn-primary 'onClick={props.requestUpdate}>Editar</button> {"  "}
                <button id='btn-cancel' className='btn btn-danger' onClick={props.openCloseModalEdit}>Cancelar</button>    
            </ModalFooter>
      </Modal>
    )
}

export function BookDeleteModal(props : any){
    return(
        <Modal isOpen={props.modalDelete}>
            <ModalBody>
              Esta ação vai eliminar o livro: <br />
              Titulo: {props.bookSelected && props.bookSelected.name} <br />
              Autor: {props.bookSelected && props.bookSelected.authorName} <br />
              ISBN: {props.bookSelected && props.bookSelected.isbn} <br />
              <b>Deseja continuar?</b>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={props.requestDelete}>Eliminar</button>
              <button className='btn btn-secondary' onClick={props.openCloseModalDelete}>Cancelar</button>
            </ModalFooter>
      </Modal>
    )
}

export function AuthorModal(props: any){
    return(
        <Modal isOpen={props.modalEdit}>
            <ModalHeader>Editar Livro</ModalHeader>
            
            <ModalBody>
                <div className='form-group'>
                    <input type="number" hidden name='id' value={props.authorSelected && props.authorSelected.id}/>
                
                    <label>Nome:</label>
                    <br/>
                    <input type="text" className='form-control' name='name'required onChange={props.handleChange} value={props.authorSelected && props.authorSelected.name} />
                    <label>País:</label>
                    <br/>
                    <input type="text" className='form-control'  name='country' required onChange={props.handleChange}  value={props.authorSelected && props.authorSelected.country}/>
                    
                    <label>Imagem:</label>
                    <br/>
                    <input type="url" className='form-control' pattern="https://.*"  name='image'  onChange={props.handleChange}  value={props.authorSelected && props.authorSelected.image}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button id='btn-edit' className='btn btn-primary 'onClick={props.requestEdit}>Editar</button> {"  "}
                <button id='btn-cancel' className='btn btn-danger' onClick={props.openCloseModalEdit}>Cancelar</button>    
            </ModalFooter>
        </Modal>
    )
}

export function AuthorDeleteModal(props: any){
    return(
        <Modal isOpen={props.modalDelete}>
            <ModalBody>
                Esta ação vai eliminar o autor: <br />
                Nome: {props.authorSelected && props.authorSelected.name} <br />
                País: {props.authorSelected && props.authorSelected.country} <br />
                <b>Deseja continuar?</b>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' onClick={props.requestDelete}>Eliminar</button>
                <button className='btn btn-secondary' onClick={props.openCloseModalDelete}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}