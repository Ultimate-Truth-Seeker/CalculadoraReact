import { useCalculator } from '../hooks/useCalculator'
import Display from './Display'
import Keypad from './Keypad'

export default function Calculator () {
  const { display, press } = useCalculator()
  return (
    <div>
      <Display value={display} />
      <Keypad onPress={press} />
    </div>
  )
}