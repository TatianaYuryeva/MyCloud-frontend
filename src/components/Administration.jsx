export default function Administration({token, fetchUsersList}) {
  const usersList = fetchUsersList(token)

  return (
    <>
    Привет, админ!
    </>
  )
}