import { useState ,useEffect,useRef} from "react";
import Die from './die.jsx'
import {nanoid} from "nanoid"
import Confetti from './Confetti.jsx'

function Content(){

    function generateAllNewDice(){
        return new Array(10).fill(0).map(()=>({
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()

        }))
    }

    const [dice,setDice]=useState(generateAllNewDice())
    const buttonRef=useRef(null)

    const gameWon=dice.every(die=>die.isHeld) && 
       dice.every(die=>die.value===dice[0].value)

    useEffect(()=>{
        if (gameWon) {
            buttonRef.current.focus()
        }
    },[gameWon])

    function rollDice(){
        if(!gameWon){
            setDice(oldDice => oldDice.map(die=>
                die.isHeld ? die :
                    {...die,value:Math.ceil(Math.random()*6)}
            ))
        }else{
            setDice(generateAllNewDice())
        }    
    }

    function hold(id){
        setDice(oldDice=> oldDice.map(die=>
            die.id===id?
            {...die,isHeld:!die.isHeld}:
            die
        ))
    }

    const diceElements=dice.map(dieobj =>(
    <Die key={dieobj.id} 
      value={dieobj.value} 
      isHeld={dieobj.isHeld}
      hold={hold}
      id={dieobj.id}
    />))

    

    return(
        <div className="content-container">
            { gameWon && <Confetti/> }
            
            <div className="buttons">
                <h1>Tenzies</h1>
                {gameWon && (
                    <p className="win-text">
                        Congratulations! You won the game 
                    </p>
                )}
                {!gameWon && (
                    <p>Roll until all dice are the same .Click each die to 
                    freeze it at its current value between rolls.
                </p>

                )}
                
                {diceElements}
                <button 
                    className="roll-btn" onClick={rollDice} 
                    ref={buttonRef} 
                    aria-label={gameWon ? "start a new game" : "Roll dice"}
                >
                    {gameWon ? "New Game" : "Roll"}
                    </button>     
            </div>   
        </div>
         
    )
}
export default Content;