import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../src/components/Calculator'

const click = async (text) => {
  const dispOrbutton = screen.getAllByText(text)
  await userEvent.click(dispOrbutton.pop())
}

const res = (text) =>
  screen.getAllByText(text).findIndex(el => el.ariaLabel === 'display')

async function evaluate(p, o, n) {
  for (const d of p) await click(d)
  for (const d of o) await click(d)
  for (const d of n) await click(d)
  await click('=')
}

describe('evaluate()', () => {
  beforeEach(() => {
      render(<Calculator />)
    })

  it('adds numbers', async () => {
    await evaluate('2', '+', '3')
    expect(res('5')).toBeGreaterThan(-1)
  })

  it('handles negative results', async () => {
    await evaluate('5', '-', '8')
    expect(res('-3')).toBeGreaterThan(-1)
  })

  it('divides with decimals', async () => {
    await evaluate('1', '÷', '4')
    expect(res('0.25')).toBeGreaterThan(-1)
  })

  it('shows ERROR for overflow', async () => {
    await evaluate('999999999', '+', '1')
    expect(res('ERROR')).toBeGreaterThan(-1)
  })

  it('respects modulo', async () => {
    await evaluate('7', '%', '3')
    expect(res('1')).toBeGreaterThan(-1)
  })
})