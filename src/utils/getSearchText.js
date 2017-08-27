export default function getSearchText(currentMentionText, lastCharacter) {
  return `${currentMentionText}${lastCharacter}`.substring(1)
}
