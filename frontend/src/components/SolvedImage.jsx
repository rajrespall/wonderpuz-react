const SolvedImage = ({ imageUrl, difficulty }) => {
  const getGridStyle = (difficulty) => {
    let rows, columns
    switch (difficulty) {
      case 'EASY':
        rows = columns = 2
        break
      case 'MEDIUM':
        rows = columns = 3
        break
      case 'HARD':
        rows = columns = 4
        break
      default:
        rows = columns = 2
    }

    return {
      display: 'grid',
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1px',
      background: '#4a4a4a',
      padding: '1px',
      width: '100%',
      aspectRatio: '1',
    }
  }

  return (
    <div className="guide-image-container">
      <div style={getGridStyle(difficulty)}>
        {Array.from({ length: difficulty === 'EASY' ? 4 : difficulty === 'MEDIUM' ? 9 : 16 }).map((_, index) => (
          <div key={index} className="grid-cell">
            <div 
              className="cell-content"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${difficulty === 'EASY' ? '200%' : difficulty === 'MEDIUM' ? '300%' : '400%'}`,
                backgroundPosition: `${(index % (difficulty === 'EASY' ? 2 : difficulty === 'MEDIUM' ? 3 : 4)) * (100 / (difficulty === 'EASY' ? 1 : difficulty === 'MEDIUM' ? 2 : 3))}% ${Math.floor(index / (difficulty === 'EASY' ? 2 : difficulty === 'MEDIUM' ? 3 : 4)) * (100 / (difficulty === 'EASY' ? 1 : difficulty === 'MEDIUM' ? 2 : 3))}%`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SolvedImage