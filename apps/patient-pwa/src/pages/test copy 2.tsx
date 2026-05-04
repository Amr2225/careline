import { useParams } from "react-router"

export default function TestPage3() {
  const param = useParams()

  return <div>Edit Page {param.id}</div>
}
