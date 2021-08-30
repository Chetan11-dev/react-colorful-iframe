import React, { FC, useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Iframe from "./Iframe"
import reportWebVitals from "./reportWebVitals"
import { HexColorInput, RgbaColorPicker, RgbaColor } from "react-colorful"

const Picker: FC = () => {
  const [state, setstate] = useState({
    r: 23,
    g: 27,
    b: 34,
    a: 1,
  })

  return <RgbaColorPicker color={state} onChange={setstate} />
}

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Iframe>
        <Picker />
      </Iframe>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
