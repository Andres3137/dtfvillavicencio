import { useCallback } from 'react'

export function useTilt(strength = 8) {
  const onMouseMove = useCallback(e => {
    const el = e.currentTarget
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale(1.02)`
  }, [strength])

  const onMouseLeave = useCallback(e => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return { onMouseMove, onMouseLeave }
}
