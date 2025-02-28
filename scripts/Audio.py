from gtts import gTTS
import os

def generate_audio(text, output_path):
    """
    Generate audio for a given text using Google TTS.
    Args:
        text (str): The text to convert to speech.
        output_path (str): File path to save the audio.
    """
    try:
        tts = gTTS(text, lang='en', slow=False, tld="com.au" )  # Set language to English, faster speed
        tts.save(output_path)  # Save the audio file
        print(f"Audio saved: {output_path}")
    except Exception as e:
        print(f"Error generating audio for '{text}': {e}")

def manual_input_to_audio():
    """
    Accept manual input from the user and convert it to speech.
    """
    while True:
        user_input = input("Please enter your text (or type 'exit' to quit): ")
        
        if user_input.lower() == 'exit':
            print("Exiting the program.")
            break
        
        # Generate audio from the provided text
        sanitized_text = user_input.replace(" ", "_").lower()  # Clean up text for filenames
        output_audio_path = f"{sanitized_text}.mp3"

        # Generate audio
        generate_audio(user_input, output_audio_path)

# Directory for saving audio files
output_audio_dir = "./"  
os.makedirs(output_audio_dir, exist_ok=True)  # Ensure the audio directory exists

# Change the working directory to the output directory
os.chdir(output_audio_dir)

# Start accepting user input
manual_input_to_audio()
