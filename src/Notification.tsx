import { FormEvent, useCallback, useEffect, useState } from "react"

const url = "http://localhost:5000/notification"

function Dashboard() {

  const [notification, setNotification] = useState<Record<string, string | Array<string>>>({})
  useEffect(() => {
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response: Response) => {
        if (response.ok) return response.json()
      })
      .then((response: JSON) => {
        setNotification(response)
      })
  }, [])

  return (
    <>
      <p>Message: {notification.message}</p>
      <div>Count: {notification.count}</div>
      {(notification.notifications as string[])?.forEach((notif: string, index: number) => {
        <div key={index}>
          {notif}
        </div>
      })}
    </>
  )
}

export default Dashboard
