import { useState } from "react"

export default function UploadForm({token}) {
  const [file, setFile] = useState()
  const [comment, setComment] = useState('')
  
  const addFile = async (e) => {
    e.preventDefault()

    const formData  = new FormData()
    formData.append('title', file.name)
    formData.append('size', file.size)
    formData.append('comment', comment)
    formData.append('upload', file)

    console.log(formData)
    const response = await fetch('http://localhost:8000/files/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      body: formData,
    })
    
    console.log(response.json())

  }

  return (
    <form className="form form-upload" encType="multipart/form-data" onSubmit={addFile}>
      <div className="form__group">
      <label htmlFor="form-upload__file">Загрузить файл</label>
        <input type="file" 
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
          rows="6">
        </textarea>
        </div>
        <button className="btn form__btn">Загрузить</button>
      </form>
  )
}