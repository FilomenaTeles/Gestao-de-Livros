import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function BookModal(openModal:boolean,id:number,isbn:number, name:string,authorId:number,price:number, image:string){
   

    return(
        <div>
            <Modal isOpen={openModal}>
        <ModalHeader>Editar Livro</ModalHeader>
                
        {/* <ModalBody>
            <div className='form-group'>
              <input type="number" hidden name='id' value={id}/>
            <label>Isbn:</label>
            <input type="number" className='form-control' name='isbn' required onChange={handleChange} value={isbn} />
            <br/>
            <label>Nome:</label>
            <input type="text" className='form-control' name='name'required onChange={handleChange} value={name} /><br/>
            <label>Autor:</label> <br />
            <select className='form-control' name="authorId" id="authorId" onChange={handleChange}>
                {allAuthors.map((author: {name:string; id:number;}) => (
                  {...bookSelected.authorId == author.id?(
                    <option value={author.id} selected >{author.name}</option>
                  ):(
                    <option value={author.id}>{author.name}</option>
                  )}
                  
                ))}
            </select><br/>
            <label>Preço:</label>
            <br/>
            <input type="number" className='form-control'  name='price' required onChange={handleChange} value={price} /><br/>
            <label>Imagem:</label>
            <br/>
            <input type="url" className='form-control' pattern="https://.*"  name='image'  onChange={handleChange}  value={image}/>
            </div>
        </ModalBody> */}
        {/* <ModalFooter>
            <button id='btn-edit' className='btn btn-primary 'onClick={()=>requestUpdate()}>Editar</button> {"  "}
            <button id='btn-cancel' className='btn btn-danger' onClick={()=>openCloseModalEdit()}>Cancelar</button>    
        </ModalFooter> */}
      </Modal>
        </div>
    )
}