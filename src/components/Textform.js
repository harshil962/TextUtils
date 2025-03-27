import React, { useState } from "react";

export default function Textform(props) {
  const handleUpClick = () => {
    // console.log("UpperCase was clicked."+ text);
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted to UpperCase !", "success");
  };

  const handleLoClick = () => {
    // console.log("LowerCase was clicked."+ text);
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to LowerCase !", "success");
  };

  const handleclClick = () => {
    // console.log("LowerCase was clicked."+ text);
    let newtext = " ";
    setText(newtext);
    props.showAlert("Text cleared  !","success")
  };
  const handleOnChange = (event) => {
    // console.log("On Change");
    setText(event.target.value);
  };
  const handlecopy = () => {
    console.log("i am copy");
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text copied !","success")
  };

  const RemoveExtraSpaces = () => {
    var newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra space removed !","success")
  };

  const translateHindiToEnglish = async () => {
    if (!text.trim()) return; // Avoid empty input
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const translatedText = data[0].map(item => item[0]).join(" ");
        setText(translatedText);
        props.showAlert("Translation successful!", "success");
    } catch (error) {
        console.error("Translation error:", error);
        props.showAlert("Translation failed!", "danger");
    }
};

const translateEnglishToHindi = async () => {
  if (!text.trim()) return; // Avoid empty input
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const translatedText = data[0].map(item => item[0]).join(" ");
      setText(translatedText);
      props.showAlert("Translation successful!", "success");
  } catch (error) {
      console.error("Translation error:", error);
      props.showAlert("Translation failed!", "danger");
  }
};


  const [text, setText] = useState("");

  // setText("new text");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{props.heading} </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleclClick}>
          clear text{" "}
        </button>
        <button className="btn btn-primary mx-2" onClick={handlecopy}>
          copy text{" "}
        </button>
        <button className="btn btn-primary mx-2" onClick={RemoveExtraSpaces}>
          Remove Extra Spaces{" "}
        </button>
        <button className="btn btn-primary mx-2" onClick={translateHindiToEnglish}>
          Hindi to English
        </button>
        <button className="btn btn-primary mx-2" onClick={translateEnglishToHindi}>
          English to Hindi
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
        <h3>Your text summery</h3>
        <p>
  <b>
    {text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length} words and {text.length} characters
  </b>
</p>
<p> 
  {0.008 * (text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length)} minutes read
</p>
<h2>Preview</h2>
<p>
  {text.length > 0 ? text : "Enter something in the textbox here to preview it here."}
</p>

      </div>
    </>
  );
}
