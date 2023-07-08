import Paper from '../assets/img/images/icon-paper.svg'
import Triangle from '../assets/img/images/bg-triangle.svg'
import Rock from '../assets/img/images/icon-rock.svg'
import Scissors from '../assets/img/images/icon-scissors.svg'
import Rules from '../assets/img/images/image-rules.svg'
import { useState, useEffect } from 'react'
import { utilService } from '../services/util.service'
import { capitalize } from 'lodash'
import buttonSoundFile from '../assets/sounds/button-pressed-38129.mp3'
import winSoundFile from '../assets/sounds/ui_correct_button2-103167.mp3'
import loseSoundFile from '../assets/sounds/negative_beeps-6008.mp3'
import hoverSoundFile from '../assets/sounds/click-21156.mp3'

export function HomePage() {
    // const [gameOpt, setGameOpt] = useState(['paper', 'rock', 'scissors'])
    const gameOptions = ['paper', 'rock', 'scissors']
    const [playedOpt, setPlayedOpt] = useState(null)
    const [gameResult, setGameResult] = useState(null)
    const [computerSelection, setComputerSelection] = useState(computerSelect())
    const [gameScore, setGameScore] = useState(0)
    const [rules, setRules] = useState(false)
    const buttonSound = new Audio(buttonSoundFile)
    const winSound = new Audio(winSoundFile)
    const loseSound = new Audio(loseSoundFile)
    const hoverSound = new Audio(hoverSoundFile)

    function computerSelect() {
        const num = utilService.getRandomIntInclusive(0, 2)
        return gameOptions[num]
    }

    function PlayerSelection(choosenHand) {
        const selectedOption = choosenHand
        buttonSound.play()
        setPlayedOpt(selectedOption)
        gameCases(selectedOption)
    }

    function gameCases(playedOpt) {
        const outcomes = {
            paper: {
                paper: 'Draw',
                rock: 'You Win!',
                scissors: 'You Lose!',
            },
            rock: {
                rock: 'Draw',
                scissors: 'You Win!',
                paper: 'You Lose!',
            },
            scissors: {
                scissors: 'Draw',
                paper: 'You Win!',
                rock: 'You Lose!',
            },
        }

        const outcome = outcomes[playedOpt][computerSelection]
        setGameResult(outcome)

        if (outcome === 'You Win!') {
            winSound.play()
            setGameScore((prev) => prev + 1)
        } else {
            loseSound.play()
        }
    }

    function returnSVG(img) {
        if (img === 'paper') {
            return Paper
        } else if (img === 'rock') {
            return Rock
        } else {
            return Scissors
        }
    }

    function playAgain() {
        buttonSound.play()
        setComputerSelection(computerSelect())
        setPlayedOpt(null)
    }

    const handleMouseEnter = () => {
        hoverSound.play()
    }

    function activeRules() {
        setRules((prev) => !prev)
    }
    return (
        <section className='home-page flex justify-center align-center column'>
            <section className='headline-frame flex justify-center align-center space-between'>
                <div className='headline flex column'>
                    <h2>ROCK</h2>
                    <h2>PAPER</h2>
                    <h2>SCISSORS</h2>
                </div>
                <div className='score flex column'>
                    <p className='score-headline'>score</p>
                    <p className='current-score'>{gameScore}</p>
                </div>
            </section>
            <main className='game-section flex'>
                {!playedOpt && (
                    <section className='start-section'>
                        <img src={Triangle} className='triangle-img' />
                        <div className='paper-btn' onClick={() => PlayerSelection('paper')} onMouseEnter={handleMouseEnter}>
                            <div className='btn-background flex align-center justify-center paper-border'>
                                <img src={Paper} className='hand-img' alt='paper' />
                            </div>
                        </div>
                        <div className='rock-btn' onClick={() => PlayerSelection('rock')} onMouseEnter={handleMouseEnter}>
                            <div className='btn-background flex align-center justify-center rock-border'>
                                <img src={Rock} className='hand-img' alt='rock' />
                            </div>
                        </div>
                        <div className='scissors-btn' onClick={() => PlayerSelection('scissors')} onMouseEnter={handleMouseEnter}>
                            <div className='btn-background flex align-center justify-center scissors-border'>
                                <img src={Scissors} className='hand-img' alt='scissors' />
                            </div>
                        </div>
                    </section>
                )}
                {playedOpt && (
                    <section className='result-section'>
                        <div className='flex space-between result'>
                            <div className='flex column result-item'>
                                <p className='btn-heading'>YOU PICKED</p>
                                <div className={`btn-background flex align-center justify-center ${playedOpt}-border`}>
                                    <img src={returnSVG(playedOpt)} className='hand-img' alt={playedOpt} />
                                </div>
                            </div>
                            <div className='flex column align-center result-item'>
                                <h2 className='result-heading'>{gameResult}</h2>
                                <button className='play-again' onClick={playAgain} onMouseEnter={handleMouseEnter}>
                                    {' '}
                                    PLAY AGAIN
                                </button>
                            </div>
                            <div className='flex column result-item'>
                                <p className='btn-heading'>THE HOUSE PICKED</p>
                                <div className={`btn-background flex align-center justify-center ${computerSelection}-border`}>
                                    <img src={returnSVG(computerSelection)} className='hand-img' alt={computerSelection} />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {rules && (
                    <div className='rulesModal flex column'>
                        <div className='rulesHeader flex space-between'>
                            <h2 className='rulesHeading'>RULES</h2>
                            <button className='closeModal' onClick={activeRules}>
                                x
                            </button>
                        </div>
                        <img src={Rules} className='rules-img' />
                    </div>
                )}
            </main>
            <footer className='gameRules'>
                <button className='rules-btn' onMouseEnter={handleMouseEnter} onClick={activeRules}>
                    RULES
                </button>
            </footer>
        </section>
    )
}
