import { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BlogForm = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');  // 초기값은 없어야 하기때문에 empty
  const [body, setBody] = useState('');  // 초기값은 없어야 하기때문에 empty
  const onSubmit = () => {
    axios.post('http://localhost:3001/posts', {
      title,   // 키와 변수의 이름이 같으면 하나만 쓸 수 있음 (title: title)
      body,
      createdAt: Date.now()
    }).then(() => {
      history.push('/blogs');
    })
  };

    return (
        <div>
            <h1>Create a blog post</h1>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title} // empty string을 밸류로 가져옴
                onChange={(event) => {
                  setTitle(event.target.value);
                } } />
            </div>
            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea
                className="form-control"
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                } }
                rows={20} />
            </div>
            <button
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Post
            </button>
          </div>
    );
};

export default BlogForm;