export default function Display ({ value }) {
  return <output data-testid='display' aria-label='display'>{value}</output>
}