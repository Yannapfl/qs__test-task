import './IconButton.css';

export default function IconButton({
    direction,
    disable,
    onClick
}) {
    let cls = 'icon-button'

    if (direction === 'left') {
        cls += ' left';
    }

    if (direction === 'right') {
        cls += ' right';
    }

    if (direction === 'first') {
        cls += ' first';
    }

    if (direction === 'last') {
        cls += ' last';
    }
    
    if (disable) {
        cls += ' disable';
    }

    return (
        <div className={cls} onClick={onClick} />
    )
}
