import React from 'react'
import Navbar from './Navbar.jsx';

function RegelnChat() {
    return (
        <div>
            <Navbar/>
        
            <div className="chatRules">
                <h1>Verhalten im Chat</h1>
                    <br />
                    <br />
                <ul>
                    <li><strong>Nicht spammen: </strong>Schreibe nur, wenn du wirklich einen sinnvollen Beitrag zum Gespräch leisten kannst oder eine wichtige Frage hast. Unnötige Inhalte nerven und sind oft der Auslöser für Streit.</li>
                    <br />
                    <li><strong>Keine Beleidigungen und Lästereien: </strong>Wie im echten Leben gilt auch im Gruppenchat, dass niemand beleidigt werden sollte! Auch Lästereien über Leute, die nicht im Chat sind sollten tabu sein!</li>
                    <br />
                    <li><strong>Kein Mobbing: </strong>Niemand sollte fertig gemacht werden!</li>
                    <br />
                    <li><strong>Bedeckt halten: </strong>Teile den anderen Gruppenmitgliedern nicht zu viel von dir mit. Das gilt besonders für große Gruppenchats, oder Chats in denen du nicht alle Mitglieder kennst. 
                    <br />
                    Je mehr Informationen du über dich preisgibst, desto angreifbarer machst du dich, zum Beispiel für Mobbing.</li>
                    <br />
                    <li><strong>Achte auf deine Ausdrucksweise: </strong>Schreibe nicht in GROßBUCHSTABEN und achte auf deine Rechtschreibung. Wer Texte mit vielen Rechtschreibfehlern lesen muss, ist schnell genervt.</li>
                    <br />
                    <li><strong>Vermeide Doppeldeutigkeiten: </strong>Drücke dich so aus, dass jeder verstehen kann, was gemeint ist, um Missverständnisse zu vermeiden.  </li>
                    <br />
                    <li>Vermeide Wiederholungen und sende keine Kettenbriefe.</li>
                    <br />
                    <li><strong>Privatsphäre beachten: </strong>Gib keine privaten Nummern von anderen Personen weiter.</li>
                    <br />
                    <li><strong>Recht am eigenen Bild beachten: </strong>Verschicke keine Bilder ohne die Einwilligung der abgebildeten Personen, da du sonst das Recht am eigenen Bild verletzt.</li>
                    <br />
                    <br />
                    <li className="chatDirections" ><strong>Den Anweisungen des Kinopersonals ist Folge zu leisten!</strong></li>
                </ul>
            </div>
        </div>
    )
}

export default RegelnChat
