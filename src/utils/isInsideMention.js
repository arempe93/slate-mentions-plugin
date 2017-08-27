export default function isInsideMention(state, key) {
  return state.marks.some(mark => mark.type === key)
}
