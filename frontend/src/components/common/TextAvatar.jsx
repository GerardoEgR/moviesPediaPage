import { Badge } from "react-bootstrap"

const TextAvatar = ({ text }) => {

  const stringToColor = (str) => {
    // Generar un hash para el texto
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 6) - hash)
    }
    // Generar un color en formato hexadecimal
    const color = "#" + ((hash & 0x00FFFFFF).toString(16)).padStart(6, '0')
    return color
  }

  const avatarStyle = {
    backgroundColor: stringToColor(text),
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginRight: 10
  }
  return (
    <Badge pill style={avatarStyle}>
      {text.split(" ")[0][0]}
    </Badge>
  )
}

export default TextAvatar