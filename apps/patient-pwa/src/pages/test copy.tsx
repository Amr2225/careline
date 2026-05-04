import { useParams } from "react-router"

export default function TestPage2() {
  const param = useParams()

  return <div>TestPage {param.id}</div>
}
