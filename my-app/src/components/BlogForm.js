import { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import propTypes from 'prop-types'
import useToast from '../hooks/toast';

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState('');  // 초기값은 없어야 하기때문에 empty
  const [originalTitle, setOriginalTitle] = useState('');
  const [body, setBody] = useState('');  // 초기값은 없어야 하기때문에 empty
  const [originalBody, setOrigianalBody] = useState('');
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then(res => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOrigianalBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalPublish(res.data.publish);
      })
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originalTitle 
      || body !== originalBody
      || publish !== originalPublish;
  };

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push('/blogs');
    }
  };

  const validateForm = () => {
    let validated = true;

    if (title === ''){
      setTitleError(true);
      validated = false;
    }
    if (body === ''){
      setBodyError(true);
      validated = false;
    }

    return validated;
  }

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if (validateForm()) {
      if (editing) {
        axios.patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish
        }).then(res => {
          console.log(res);
          history.push(`/blogs/${id}`)
        })
      } else {
        axios.post('http://localhost:3001/posts', {
          title,   // 키와 변수의 이름이 같으면 생략가능  (title: title)
          body,
          publish,
          createdAt: Date.now()
        }).then(() => {
          addToast({
            type: 'success',
            text: 'Successfully created!'
          })
          history.push('/admin');
        })
      }
    }
  };

  const onChangePublisher = (e) => {
    setPublish(e.target.checked)
  };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError ? 'border-danger' : ''}`}
          value={title} // empty string을 밸류로 가져옴
          onChange={(event) => {
            setTitle(event.target.value);
          } } />
        {titleError && <div className='text-danger'>
          Title is required
        </div>}
      </div>
      <div className="mb-3">
        <label className="form-label ">Body</label>
        <textarea
          className={`form-control ${bodyError ? 'border-danger' : ''}`}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          } }
          rows="10" />
        {bodyError &&<div className='text-danger'>
          body is required
        </div>}
      </div>
      <div className='form-check mb-3'>
        <input 
          className='form-check-input'
          type='checkbox'
          checked={publish}
          onChange={onChangePublisher}
        />
        <label className='form-check-label'>
          Publish
        </label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? 'Edit' : 'Post'}
      </button>
      <button
        className="btn btn-danger ms-2"
        onClick={goBack}
      >
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;