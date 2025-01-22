
export default function Results({isVisible, error, result}) {

    return (
        <div className={`docs ${isVisible ? "" : "hide"}`}>
        {error && <p className='red'>{error}</p>}

        {result && (
          <div>
            <h2 className='center results'>Search Results:</h2>
            {result.map((item, key) => (
              <div key={item._id.$oid} style={{ marginBottom: '20px' }}>
                <p><strong>Title: </strong>{item.title}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Solution:</strong> {item.solution}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}