function Die({value,isHeld,hold,id}){
    const styles={
        backgroundColor:isHeld?"#59e391":"lightgrey"
    }

    return(
        <button className="die" style={styles} onClick={()=> hold(id) }
        aria-pressed={isHeld}
        aria-label={`Die with value ${value}
        ${isHeld ? "held": "not held"}`}
        >
            {value}
        </button>
        
    )
}
export default Die;