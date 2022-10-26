export const CreateForm = (props) => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleCreatePost } =
    props;
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Post title"
              onChange={(e) => setPostTitle(e.target.value)}
              defaultValue={postTitle}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control form-control-sm"
              colums={3}
              placeholder="Post body"
              onChange={(e) => setPostBody(e.target.value)}
              defaultValue={postBody}
            />
          </div>
          <div className="text-end">
            <button
              className="btn btn-primary btn-sm px-5"
              onClick={() => {
                handleCreatePost();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
