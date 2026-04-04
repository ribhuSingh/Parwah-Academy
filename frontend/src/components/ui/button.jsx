import React from 'react'
import clsx from 'clsx'

export default function Button({ children, className, variant = 'primary', ...props }) {
  return (
    <button {...props} className={clsx('btn', `btn-${variant}`, className)}>
      {children}
    </button>
  )
}
