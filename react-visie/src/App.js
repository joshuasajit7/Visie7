import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
    const [outputText, setOutputText] = useState('');
    const [summaryText, setSummaryText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef(null);

    const convertImageToTextAndSpeech = () => {
        const fileInput = document.getElementById('fileInput');

        if (!fileInput.files || fileInput.files.length === 0) {
            setOutputText('Please select an image file.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                Tesseract.recognize(
                    img,
                    'eng',
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    setOutputText(text);
                    summarizeText(text); // Summarize the extracted text
                    speakText(text); // Call function to speak the extracted text
                });
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    const summarizeText = (text) => {
        // Split text into sentences
        const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
        
        // Count the frequency of each word
        const wordFrequency = {};
        text.replace(/[^\w\s]/g, '').toLowerCase().split(/\s+/).forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        // Score sentences based on word frequencies
        const sentenceScores = sentences.map(sentence => {
            const words = sentence.split(/\s+/);
            const score = words.reduce((sum, word) => sum + (wordFrequency[word.toLowerCase()] || 0), 0);
            return { sentence, score };
        });

        // Sort sentences by score in descending order and select top 3
        const topSentences = sentenceScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.sentence);

        setSummaryText(topSentences.join(' '));
    };

    const speakText = (text) => {
        stopSpeech(); // Stop any ongoing speech synthesis
        const speech = new SpeechSynthesisUtterance(text);
        speech.onstart = () => setIsSpeaking(true);
        speech.onend = () => setIsSpeaking(false);
        utteranceRef.current = speech;
        window.speechSynthesis.speak(speech);
    };

    const pauseSpeech = () => {
        if (utteranceRef.current && isSpeaking) {
            window.speechSynthesis.pause();
            setIsSpeaking(false);
        }
    };

    const resumeSpeech = () => {
        if (utteranceRef.current && !isSpeaking) {
            window.speechSynthesis.resume();
            setIsSpeaking(true);
        }
    };

    const stopSpeech = () => {
        if (utteranceRef.current) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const saveTextToFile = () => {
        const blob = new Blob([outputText], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = 'recognized_text.txt';
        anchor.click();
    };

    return (
        <div className="container" aria-labelledby="mainContent" role="main">
            <h1 id="mainContent">Image to Text with Summarizer</h1>
            
            <input 
                type="file" 
                id="fileInput" 
                accept="image/*" 
                aria-label="Select an image file to convert to text" 
                onFocus={() => speakText("Please select an image file to convert to text.")}
                tabindex="0" 
            />

            <button 
                onClick={convertImageToTextAndSpeech} 
                aria-label="Convert image to text and speak" 
                aria-live="assertive"
            >
                Convert and Speak
            </button>

            <button 
                onClick={pauseSpeech} 
                disabled={!isSpeaking} 
                aria-label="Pause speech synthesis" 
                aria-live="assertive"
            >
                Pause
            </button>

            <button 
                onClick={resumeSpeech} 
                disabled={isSpeaking} 
                aria-label="Resume speech synthesis" 
                aria-live="assertive"
            >
                Resume
            </button>

            <button 
                onClick={stopSpeech} 
                aria-label="Stop speech synthesis" 
                aria-live="assertive"
            >
                Stop
            </button>

            <button 
                onClick={saveTextToFile} 
                aria-label="Save the recognized text to a file"
            >
                Save Text
            </button>

            <textarea 
                value={outputText} 
                rows="10" 
                readOnly 
                placeholder="Extracted text will appear here" 
                aria-label="Extracted text output area"
                aria-live="polite"
            />

            <h2>Summary</h2>
            <textarea 
                value={summaryText} 
                rows="5" 
                readOnly 
                placeholder="Summary will appear here" 
                aria-label="Summary text area"
                aria-live="polite"
            />

            <button 
                onClick={() => speakText(summaryText)} 
                disabled={!summaryText}
                aria-label="Speak summary of the text"
                aria-live="assertive"
            >
                Speak Summary
            </button>
        </div>
    );
}

export default App;
