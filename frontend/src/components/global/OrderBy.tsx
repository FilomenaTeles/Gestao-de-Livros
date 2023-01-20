
export function OrderBy(props:any){

    return(
        <div className='container text-end col-4'>
          {props.isBook== true ? (
             <select className='' name="orderBy" id="orderBy" onChange={props.onChange}>
                <option value="name-asc">Nome (ASC)</option>
                <option value="price-asc">Preço (ASC)</option>
                <option value="name-desc">Nome (DESC)</option>
                <option value="price-desc">Preço (DESC)</option>
            </select>
            
          ):(
            <select className='' name="orderBy" id="orderBy" onChange={props.onChange}>
                <option value="name-asc">Nome (ASC)</option>
                <option value="country-asc">País (ASC)</option>
                <option value="name-desc">Nome (DESC)</option>
                <option value="country-desc">País (DESC)</option>
                </select>
          )}
         
       
      </div>
    
    )
}