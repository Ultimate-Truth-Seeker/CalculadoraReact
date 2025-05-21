import Calculator from '../components/Calculator'
import Display from '../components/Display'
import KeyButton from '../components/KeyButton'
import Keypad from '../components/Keypad'

export default { title: 'Calculator', component: Calculator }

export const Default = {}
export const Overflow = { render: () => <Display value='ERROR' /> }
export const SevenButton = { render: () => <KeyButton label='7' onClick={() => {}} /> }
export const EqualButton = { render: () => <KeyButton label='=' onClick={() => {}} /> }
export const KeypadDemo = { render: () => <Keypad onPress={() => {}} /> }