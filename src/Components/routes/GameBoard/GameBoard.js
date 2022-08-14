import './GameBoard.scss';

function GameBoard(props) {
    //build a array of cell names
    let cells = [];
    for(let y = 1; y<=parseInt(props.cols); y++) {
        for(let x = 1; x<=parseInt(props.rows); x++) {
            cells.push(`c${x}${y}`);
        }
    }
    // set the grid-template-column value
    let gridColumns = '';
    for(let i=1;i<=props.cols;i++) {
        gridColumns += ' 1fr';
    }

    return (
        <div className="GameBoard">
            <div
                className="game-grid"
                style={{
                    display: 'grid',
                    width: props.width + 'px',
                    height: props.height + 'px',
                    margin: '20px auto 10px',
                    gridTemplateColumns: gridColumns
                }}
            >
                {cells.map(cellName => (
                    <div
                        id={cellName}
                        className="cells"
                        key={`${cellName}-cell`}
                        style={{
                            borderBottom: cellName.substring(2) < props.rows ? '1px solid green' : 'none',
                            borderRight: cellName.substring(1, 2) < props.cols ? '1px solid green' : 'none',
                            height: props.height/3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: (props.width/props.cols) * 0.8
                        }}
                        onClick={props.handleCellClick}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default GameBoard;