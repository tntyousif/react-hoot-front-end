import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as hootService from '../../services/hootService'

const CommentForm = props => {
  const { hootId, commentId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    text: '',
  })

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId)
      const comment = hootData.comments.find(comment => comment._id === commentId)
      if (comment) {
        setFormData({ text: comment.text })
      }
    }
    if (hootId && commentId) fetchHoot()
  }, [hootId, commentId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (hootId && commentId) {
      await hootService.updateComment(hootId, commentId, formData)
      navigate(`/hoots/${hootId}`)
    } else {
      props.handleAddComment(formData)
    }
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