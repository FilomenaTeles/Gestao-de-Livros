
export function SeacrhBy(props:any){

    return(
        <div className='col-8'>
          <form className=" mb-3"  onSubmit={props.requestGetBy}>
            <input type="text" name='search' value={props.inputSearch} onChange={props.setSearch}/>
            {props.inputSearch.length< 3 
            ? (
              <button className='btn ms-2' disabled type='submit' >Pesquisar</button>
              
            )
            :(<button className='btn ms-2' type='submit' >Pesquisar</button>)} 
            
            <button className="btn md-2" onClick={ props.searchReset}>Limpar</button>
          </form>
        </div>
    )
}