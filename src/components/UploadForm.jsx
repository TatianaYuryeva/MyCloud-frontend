import { useState } from "react"

export default function UploadForm({token}) {
  const [file, setFile] = useState()
  const [comment, setComment] = useState('')
  //const [title, setTitle] = useState('')

  const userFile = {
    //title: file.name,
    comment: comment,
    file: file
  }
  
  const addFile = async (e) => {
    e.preventDefault()
    //console.log(e.target)
    console.log(file.name)

    const response = await fetch('http://localhost:8000/files/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(userFile)
    })

    console.log(JSON.stringify(userFile))
    console.log(token)

    //const response = await fetch('http://localhost:8000/files')
    // const data = await response.json()

    // console.log(data)

    //setPosts(data)

    // setPostText('')
    // onAddPost()
    // setTimeout(() => navigateTo("/"), 300)
  }

  return (
    <form className="form form-upload" encType="multipart/form-data" onSubmit={addFile}>
      <div className="form__group">
      <label htmlFor="form-upload__file">Загрузить файл</label>
        <input type="file" 
        //value={file}
        onChange={e => setFile(e.target.files[0])}
        />
      </div>
        <div className="form__group">
        <label htmlFor="form-upload__comment">Комментарий</label>
          <textarea 
          value={comment}
          onChange={e => setComment(e.target.value)}
          name="comment"
          cols="30" 
          rows="6"
          required>
        </textarea>
        </div>
        <button className="btn form__btn">Загрузить</button>
      </form>
  )
}