import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../src/components/Calculator'

const click = async (text) =>
  await userEvent.click(screen.getByRole('button', { name: text }))

const res = () =>
  screen.getByTestId('display').textContent

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
    expect(res()).toBe('5')
  })

  it('handles negative results', async () => {
    await evaluate('5', '-', '8')
    expect(res()).toBe('-3')
  })

  it('divides with decimals', async () => {
    await evaluate('1', '÷', '4')
    expect(res()).toBe('0.25')
  })

  it('shows ERROR for overflow', async () => {
    await evaluate('999999999', '+', '1')
    expect(res()).toBe('ERROR')
  })

  it('respects modulo', async () => {
    await evaluate('7', '%', '3')
    expect(res()).toBe('1')
  })
})