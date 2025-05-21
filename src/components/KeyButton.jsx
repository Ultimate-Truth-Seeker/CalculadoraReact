export default function KeyButton ({ label, onClick }) {
  return <button role='button' onClick={() => onClick(label)}>{label}</button>
}