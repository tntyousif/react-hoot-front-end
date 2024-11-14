// src/components/HootDetails/HootDetails.jsx

import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import * as hootService from '../../services/hootService'
import Loading from '../Loading/Loading'
import CommentForm from '../CommentForm/CommentForm';

const HootDetails = props => {
  const { hootId } = useParams()

  const [hoot, setHoot] = useState(null)

  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId)
      setHoot(hootData)
    }
    fetchHoot()
  }, [hootId])

  const handleAddComment = async (hootId) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await hootService.deleteComment(hoot._id, commentId);
    setHoot({
      ...hoot,
      comments: hoot.comments.filter((comment) => comment._id !== commentId),
    });
  };

  if (!hoot) return <Loading />

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} posted on{' '}
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
        {hoot.author._id === user._id && (
          <>
            <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
          </>
        )}
      </header>
      <p>{hoot.text}</p>
      <section>
      <h2>Comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map(comment => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default HootDetails