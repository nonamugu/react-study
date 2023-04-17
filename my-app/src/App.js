import {useState} from 'react'

function App() {
  const [title, setTitle] = useState('');  // 초기값은 없어야 하기때문에 empty
  const [body, setBody] = useState('');  // 초기값은 없어야 하기때문에 empty
  const onSubmit = () => {
    console.log(title, body);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input 
          className="form-control"
          value={title}   // empty string을 밸류로 가져옴
          onChange={(event) => {    // 입력할 때마다 setTitle을 통해 값을 가져와서 title에 업데이트를 시켜줌
            setTitle(event.target.value);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea 
          className="form-control"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);            
          }}
          rows={20}
        />
      </div>
      <button 
        className="btn btn-primary"
        onClick={onSubmit}
      >
        Post
      </button>
    </div>
  );
  
}

export default App;