import KeyButton from './KeyButton'

const keys = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']

export default function Keypad ({ onPress }) {
  const k1 = keys.slice(0, 4), k2 = keys.slice(4, 8), k3 = keys.slice(8, 12), 
  k4 = keys.slice(12, 16), k5 = keys.slice(16, 20)
  return (
    <div>
        <div>{k1.map(k => <KeyButton key={k} label={k} onClick={onPress} />)}</div>
        <div>{k2.map(k => <KeyButton key={k} label={k} onClick={onPress} />)}</div>
        <div>{k3.map(k => <KeyButton key={k} label={k} onClick={onPress} />)}</div>
        <div>{k4.map(k => <KeyButton key={k} label={k} onClick={onPress} />)}</div>
        <div>{k5.map(k => <KeyButton key={k} label={k} onClick={onPress} />)}</div>
    </div>
  )
}