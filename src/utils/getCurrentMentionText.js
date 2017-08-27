// NOTE: if this approach becomes problematic, consider using Text.characters
//       and stringing together if has Mark

export default function getCurrentMentionText(text, trigger) {
  const afterTrigger = text.substring(text.lastIndexOf(trigger))
  const spaceIndex = afterTrigger.indexOf(' ')

  if (spaceIndex === -1) {
    return afterTrigger
  }

  return text.substring(0, spaceIndex)
}
