import { useState } from "react"

export default function UploadForm() {
  const [file, setFile] = useState('')
  

  const addFile = async (e) => {
    e.preventDefault()
    console.log(file)

    const response = await fetch('http://localhost:8000/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({upload: file})
    })

    //const response = await fetch('http://localhost:8000/files')
    const data = await response.json()

    console.log(data)

    //setPosts(data)

    // setPostText('')
    // onAddPost()
    // setTimeout(() => navigateTo("/"), 300)
  }

  return (
    <form className="form form-upload" encType="multipart/form-data" onSubmit={addFile}>
      <label htmlFor="form-upload__file">Загрузить файл</label>
        <input type="file" 
        value={file}
        onChange={e => setFile(e.target.value)}
        />
        <button className="btn form__btn">Загрузить</button>
      </form>
  )
}