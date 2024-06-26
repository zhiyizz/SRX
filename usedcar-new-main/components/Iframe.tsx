import classNames from "classnames"
import { useState } from "react"

type iframeType = {
  url:string,
  show:boolean
  onClose?:VoidFunction
}
export default function Iframe({ url,show = false, onClose }:iframeType) {
  return (
    <div className={classNames("iframe",{
      "show":show
    })}>
      <a className="close" onClick={onClose}><i className="icon-close"></i></a>
      <iframe src={url} frameBorder="0" />
    </div>
  )
}
