import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"
import { useEffect, useState } from "react"
import { convertMd } from "./util/convert-md"

function App() {
  const [parseHtml, setParseHtml] = useState("")
  const [md, setMd] = useState("")

  function handleMd(e) {
    const val = e.target.value
    localStorage.setItem("md", val)

    setMd(val)
    setParseHtml(convertMd(val))
  }

  useEffect(() => {
    if (parseHtml) {
      Prism.highlightAll()
    }
  }, [parseHtml])

  useEffect(() => {
    const local = localStorage.getItem("md")

    if (local) {
      setMd(local)
      setParseHtml(convertMd(local))
    }
  }, [])

  return (
    <>
      <nav className="navbar shadow-base">
        <h2>Live-md-editor</h2>
      </nav>
      <main className="content">
        <div>
          <textarea rows={35} onChange={handleMd} value={md} />
        </div>
        <div className="result-html">
          <div dangerouslySetInnerHTML={{ __html: parseHtml }} />
        </div>
      </main>
    </>
  )
}

export default App
