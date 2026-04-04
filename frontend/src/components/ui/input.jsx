import React from 'react'
import clsx from 'clsx'

export default function Input(props) {
  const { className, ...rest } = props
  return <input className={clsx('input', className)} {...rest} />
}
