
Image to Text with Summarizer(Prototype)
Features

- Extract text from images using Tesseract.js.
- Summarize the extracted text using word frequency analysis.
- Convert text or summaries to speech using Speech Synthesis.
- Pause, resume, or stop the speech synthesis.
- Save the extracted text to a file.

Technologies Used

- React: Frontend framework.
- Tesseract.js: JavaScript OCR library for text recognition.
- SpeechSynthesis API: For text-to-speech functionality.
- CSS: Styling the user interface.

How to Run Locally
1. Clone the repository:

   git clone https://github.com/your-repo-name.git
   cd your-repo-name

2. Install dependencies:
   npm install
3. Start the development server:
   npm start
4. Open the app in your browser:
   http://localhost:3000
Usage

1. Upload an Image: Click on the file input and select an image containing text.
2. Convert Image to Text: Click on the "Convert and Speak" button to extract text from the image and hear it spoken aloud.
3. View the Extracted Text: The recognized text will appear in the text area labeled "Extracted text."
4. Summarize the Text: A summarized version of the text will appear in the "Summary" section.
5. Control Speech: Use the Pause, Resume, or Stop buttons to control speech synthesis.
6. Save Text: Click "Save Text" to download the extracted text as a .txt file.
7. Speak Summary: Click the "Speak Summary" button to hear the summarized text.

Accessibility Features

- ARIA labels: Added for better screen reader support.
- Keyboard Accessibility: Buttons and inputs can be focused and controlled using the keyboard.
- Live Regions: Used to announce changes in content to screen readers.

Project Structure


├── App.js          
├── App.css         
├── index.js        

Future Enhancements

- Add support for multi-language OCR.
- Improve the summarization algorithm for higher accuracy.
- Allow users to edit extracted or summarized text within the app.
- Enhance the user interface with modern design components.

Dependencies

- Tesseract.js: Perform OCR on images.
- React: Build the user interface.
- SpeechSynthesis API: Convert text to speech.

License
This project is licensed under the MIT License. See the LICENSE file for details.
