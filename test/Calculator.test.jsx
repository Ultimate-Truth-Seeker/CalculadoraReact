import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../src/components/Calculator'  // ajusta ruta

const click = async (text) => {
  const dispOrbutton = screen.getAllByText(text)
  await userEvent.click(dispOrbutton.pop())
}

const res = (text) =>
  screen.getAllByText(text).findIndex(el => el.ariaLabel === 'display')

describe('<Calculator /> UI behaviour', () => {
  beforeEach(() => {
    render(<Calculator />)
  })

  it('muestra dígitos y concatena hasta 9 caracteres', async () => {
    await click('1')
    await click('2')
    await click('3')
    expect(res('123')).toBeGreaterThan(-1)

    // pulsa 10 dígitos: el último debe ignorarse
    for (const d of '456789012') await click(d)
    expect(screen.getByLabelText('display').textContent.length).toBe(9)
    expect(res('123456789')).toBeGreaterThan(-1)
  })

  it('cuenta el punto como carácter dentro del límite', async () => {
    await click('1')
    await click('.')
    await click('2')
    // “1.2” son 3 caracteres
    expect(res('1.2')).toBeGreaterThan(-1)
  })

  it('resetea display tras pulsar operación y primer número', async () => {
    await click('7')
    await click('+')
    await click('3') // debe limpiar antes de mostrar “3”
    expect(res('3')).toBeGreaterThan(-1)
  })

  it('calcula inmediatamente al encadenar operaciones', async () => {
    await click('4')
    await click('×')
    await click('5')
    await click('-')          // debe mostrar 20 en el display
    expect(res('20')).toBeGreaterThan(-1)
  })

  it('botón "=" solo muestra el resultado', async () => {
    await click('8')
    await click('÷')
    await click('4')
    await click('=')
    expect(res('2')).toBeGreaterThan(-1)
  })

  it('muestra ERROR si resultado supera 999 999 999', async () => {
    for (let i = 0; i < 9; i++) await click('9')
    await click('×')
    await click('9')
    await click('=')
    expect(res('ERROR')).toBeGreaterThan(-1)
  })

  it('el signo menos cuenta como carácter y respeta límite', async () => {
    await click('1')
    await click('±')  // botón de cambio de signo (por ej. ±)
    expect(res('-1')).toBeGreaterThan(-1)
    expect(screen.getByLabelText('display').textContent.length).toBe(2)
  })

  it('la regla de 9 caracteres se mantiene tras divisiones largas', async () => {
    await click('1')
    await click('÷')
    await click('3')
    await click('=')
    const result = screen.getByLabelText('display').textContent
    expect(result.length).toBeLessThanOrEqual(9)
  })
})