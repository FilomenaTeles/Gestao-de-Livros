
export function Search(){
    return(
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text"></span>
                <input type="text" placeholder="ISBN" />
                <button type="button" className="btn">Filtrar por ISBN</button>
            </div>
        </div>
    );
}