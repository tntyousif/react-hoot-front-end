import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as hootService from '../../services/hootService'

const HootForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  })

  const { hootId } = useParams()

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId)
      setFormData(hootData)
    }
    if (hootId) {
      fetchHoot()
    } else {
      setFormData({
        title: '',
        text: '',
        category: 'News',
      })
    }
  }, [hootId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (hootId) {
        props.handleUpdateHoot(hootId, formData)
    } else {
        props.handleAddHoot(formData)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          type="text"
          required
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          type="text"
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          type="text"
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Televesion">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default HootForm