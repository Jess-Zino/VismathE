import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpeechToLatex() {
  const [recording, setRecording] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [latex, setLatex] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

const stopRecording = async () => {
  try {
    setIsLoading(true);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording URI:", uri);

    // Read file as binary blob
    const response = await fetch(uri);
    const audioBlob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async () => {
      const audioBuffer = reader.result;

      // Connect to WebSocket
      const ws = new WebSocket("ws://192.168.137.1:8000/ws/audio"); 

      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        console.log("WebSocket connection established.");
        ws.send(audioBuffer); // Send audio to backend
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received from backend:", data);
        setTranscribedText(data.latex); // Optional: Show LaTeX source
        setLatex(data.latex); // Render LaTeX visually
        setIsLoading(false);
        ws.close();
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsLoading(false);
      };
    };

    reader.readAsArrayBuffer(audioBlob);
  } catch (err) {
    console.error("Stop recording failed", err);
    setIsLoading(false);
  }
};


  const renderLatexHTML = (latexString) => `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
      </head>
      <body>
        <div id="math" style="font-size: 24px; padding: 10px;"></div>
        <script>
          katex.render("${latexString}", document.getElementById('math'), {
            throwOnError: false
          });
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textBox}
        value={transcribedText}
        editable={false}
        multiline
        placeholder="Your spoken math will appear here..."
      />

      <View style={styles.buttonGroup}>
        <Button title="Start Recording" onPress={startRecording} disabled={isLoading} />
        <Button title="Stop & Transcribe" onPress={stopRecording} disabled={!recording || isLoading} />
      </View>

      {isLoading && <ActivityIndicator size="large" color="black" />}

      {latex.length > 0 && (
        <WebView
          originWhitelist={["*"]}
          source={{ html: renderLatexHTML(latex) }}
          style={styles.webview}
          scrollEnabled={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  textBox: {
    marginTop: 20,
    width: "90%",
    height: 100,
    fontSize: 18,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    width: "90%",
  },
  webview: {
    marginTop: 20,
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
  },
});
