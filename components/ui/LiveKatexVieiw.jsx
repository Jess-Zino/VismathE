import { WebView } from "react-native-webview";

export default function LiveKaTeXView({value}) {
  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css">
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.js"></script>
      </head>
      <body style="margin:0;padding:10px;background:#222;color:white;font-size:20px;">
        <div id="math"></div>
        <script>
          document.getElementById("math").innerHTML = katex.renderToString(${JSON.stringify(value)}, { throwOnError: false });
        </script>
      </body>
    </html>
  `;
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      style={{ height: 100, backgroundColor: "transparent" }}
    />
  );
}
