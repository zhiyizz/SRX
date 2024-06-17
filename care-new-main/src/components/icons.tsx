import '../styles/icon.scss'
import classNames from 'classnames'

const assets = {
  quality: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 130 130"><defs><clipPath id="clipPath"><rect x="1.05" y="22.85" width="127.91" height="84.3" fill="none"/></clipPath><clipPath id="clipPath-2"><rect x="73.03" y="45.83" width="53.81" height="53.89" transform="translate(-5.62 8.42) rotate(-4.69)" fill="none"/></clipPath></defs><g clipPath="url(#clipPath)"><path d="M90.84,46.62,84.85,30S83,24.35,75.7,24.35H26.6a7.51,7.51,0,0,0-4.35,1.35C20.57,26.88,19,29.16,17.68,33,15.1,40.51,10.86,52.6,10.86,52.6s-1.39,3.73-2.49,4.91a8.1,8.1,0,0,1-2.56,1.73,5.67,5.67,0,0,0-3.26,5.2v36.72s.83,4.49,4.32,4.49H19.75s3.69,0,5.24-7.82H79.2S81,105.65,84,105.65H98.15a3.91,3.91,0,0,0,3.64-4.16c0-4,0-15.75,0-15.75" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/><line x1="38.56" y1="39.09" x2="49.65" y2="49.73" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/><line x1="54.35" y1="39.09" x2="65.44" y2="49.73" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></g><g clipPath="url(#clipPath-2)"><path d="M127.46,84.36a1.16,1.16,0,0,1,.4.77,1.09,1.09,0,0,1-.27.82l-10.26,12.1a1.11,1.11,0,0,1-1.59.13L102,86.48A21,21,0,0,1,74.3,59l.08-.17a1.13,1.13,0,0,1,1.76-.39l11.43,9.89,5.86-6.91L81.49,51.3a.75.75,0,0,1,.07-1.19,21.36,21.36,0,0,1,25,.76,21,21,0,0,1,7.21,21.89ZM116.34,95.72l8.79-10.37L111.2,73.53l.22-.71a18.92,18.92,0,0,0,.77-7.06A18.57,18.57,0,0,0,105.65,53a18.78,18.78,0,0,0-21.1-2.12l11.21,9.51a1.16,1.16,0,0,1,.4.77,1.14,1.14,0,0,1-.27.83l-7.33,8.64a1.12,1.12,0,0,1-.77.4A1.13,1.13,0,0,1,87,70.8L75.83,61.35a19,19,0,0,0-.9,7.48,18.69,18.69,0,0,0,26.72,15.31l.66-.32Z" /></g></svg>,
  safety: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 130 130"><defs><clipPath id="ee50c87a-0e70-4fed-ae38-226361697f2f"><rect x="34.13" y="8.69" width="61.73" height="112.63" fill="none"/></clipPath></defs><g clipPath="url(#ee50c87a-0e70-4fed-ae38-226361697f2f)"><rect x="35.63" y="10.19" width="58.73" height="109.63" rx="7.24" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/><line x1="53.53" y1="112.94" x2="76.47" y2="112.94" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/><path d="M66.09,59.94H64.41v1.2l-1,.6.84,1.46,1-.6,1,.6.84-1.46-1-.6Zm-1.68-5.78H66.1v2.89H64.41Zm0-5.79H66.1v2.9H64.41Zm0-5.78H66.1v2.9H64.41ZM53.34,67.53l2.51-1.45.84,1.46L54.19,69Zm-5,2.89L50.85,69l.84,1.45-2.51,1.45Zm10-5.78,2.5-1.45.84,1.46L59.2,66.1Zm20.45,5.79L79.65,69l2.5,1.45-.84,1.46Zm-10-5.78.84-1.46,2.51,1.45-.85,1.45Zm5,2.88.84-1.45,2.51,1.44L76.31,69Z" fill="none"/><path d="M66.09,38.5,65.25,38l-.84.49L44.8,49.82V73.44l.84.48L65.25,85.25,84.86,73.92l.84-.48V49.82Zm-19.61,34V50.79L65.25,40,84,50.79V72.46L65.25,83.3Z"/></g></svg>,
  convenient:<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 130 130"><defs><clipPath id="bb1dcd43-6bf0-43e8-a8b8-2c24de1afbf8"><rect x="11.86" y="14.28" width="106.28" height="101.43" fill="none"/></clipPath></defs><g clipPath="url(#bb1dcd43-6bf0-43e8-a8b8-2c24de1afbf8)"><path d="M89.41,61.25a.57.57,0,0,0-.57-.41l-17.68.26L87.87,46.85a.61.61,0,0,0,.17-.66.59.59,0,0,0-.56-.39H65.12a.61.61,0,0,0-.48.24l-18,24a.58.58,0,0,0,0,.63.59.59,0,0,0,.53.32l11.28-.18L46.63,89.06a.59.59,0,0,0,.08.74.6.6,0,0,0,.75.07L89.18,61.92a.59.59,0,0,0,.23-.67M53.56,82.86,62.4,69.21a.59.59,0,0,0-.51-.91l-11,.18h0L66.07,48.29H82.33L65.54,62.62a.59.59,0,0,0-.17.66.58.58,0,0,0,.56.38l16.56-.24Z"/><path d="M18.27,67.53c0-.84-.06-1.68-.06-2.53a49.17,49.17,0,1,1,3,17.07" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/><polyline points="13.36 64.03 18.54 69.21 23.73 64.03" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></g></svg>,
}



export default function SvgIcon({ icon, className }: {
  icon: keyof typeof assets 
  className?: string
}) {
  const all = {
    ...assets,
  }
  if (className) {
    return <i className={classNames("i", className)}>{all[icon]}</i>
  }
  return all[icon]
}
