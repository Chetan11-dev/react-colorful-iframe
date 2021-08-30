import { useContext, useEffect, FC } from "react"
import Frame, { FrameContext } from "react-frame-component"

const addNewStyleElementsToIframe = (
  iframeDocument: Document,
  append: boolean
) => {
  const docStyleSheets = [].slice.call(
    document.getElementsByTagName("style")
  ) as HTMLStyleElement[]
  const iframeStyleSheets = [].slice.call(
    iframeDocument.getElementsByTagName("style")
  ) as HTMLStyleElement[]
  docStyleSheets
    .filter((ds) => {
      if (iframeStyleSheets.some((is) => is.textContent === ds.textContent))
        return false
      return true
    })
    .forEach((n) => {
      if (append) {
        iframeDocument.head.appendChild(n.cloneNode(true))
      } else {
        iframeDocument.head.insertBefore(
          n.cloneNode(true),
          iframeDocument.head.firstChild
        )
      }
    })
}

function enableHotReloadInIframe(Iframe: HTMLIFrameElement) {
  const mb = new MutationObserver(() =>
    addNewStyleElementsToIframe(
      Iframe.contentDocument!,
      // prevent overriding existing sheets
      false
    )
  )
  mb.observe(document.head, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  })
}

const Iframe: FC = ({ children }) => {
  useEffect(() => {
    const Iframe = document.querySelector("iframe")!
    Iframe.contentWindow!.onload = () => {
      addNewStyleElementsToIframe(Iframe.contentDocument!, true)
      enableHotReloadInIframe(Iframe)
    }
  }, [])

  return (
    <Frame className="w-full h-full max-h-full border-0 border-none">
      {children}
    </Frame>
  )
}
export default Iframe
