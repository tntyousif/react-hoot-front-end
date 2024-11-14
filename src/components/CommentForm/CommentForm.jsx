import { useState } from 'react'

const CommentForm = props => {
  const [formData, setFormData] = useState({
    text: '',
  })

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.handleAddComment(formData)
    setFormData({ text: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        value={formData.text}
        name="text"
        id="text-input"
        required
        onChange={handleChange}
      ></textarea>
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  )
}

export default CommentForm