import { useState } from 'react'
const L = 9, M = 999999999, ops = { '+': (a, b) => a + b, '-': (a, b) => a - b, '×': (a, b) => a * b, '÷': (a, b) => a / b, '%': (a, b) => a % b }
export const useCalculator = () => {
  const [d, setD] = useState('0'), [a, setA] = useState(null), [o, setO] = useState(null), [s, setS] = useState(false)
  const clip = v => Math.abs(v) > M ? 'ERROR' : String(v).slice(0, L)
  const press = k => {
    if ('0123456789.'.includes(k)) { setD(p => (p === '0' || (o && a === null) || s || p === 'ERROR' || (p.includes('.') && k === '.') ? '' : p).length < L ? ((p === '0' || p == 'ERROR') || (p.includes('.') && k === '.') || s ? '' : p) + k : p); setS(false) }
    else if (k === '±') setD(p => (p === '0' ? p : p[0] === '-' ? p.slice(1) : '-' + p).slice(0, L))
    else if (k in ops) { const n = a === null ? d : clip(ops[o](+a, +d)); setA(n); setO(k); setD(n); setS(true) }
    else if (k === '=') { if (o) { setD(clip(ops[o](+a, +d))); setA(null); setO(null) } }
    else k === 'C' && (setD('0'), setA(null), setO(null), setS(false))
    if (d === 'ERROR') {setA(null); setO(null); setS(false)}
  }
  return { display: d, press }
}