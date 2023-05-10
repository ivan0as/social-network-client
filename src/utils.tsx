import { useEffect } from 'react';

const useOutsideAlerter = (element, callerElement, fun) => {
    return(
        useEffect(() => {
        const onClick = e => (element.current.contains(e.target) || callerElement.current.contains(e.target)) || fun()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
        }, [])
    )
}

export { useOutsideAlerter}