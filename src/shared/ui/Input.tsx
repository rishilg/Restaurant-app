import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib'

type InputProps = ComponentProps<'input'> & {
  label: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[13px] font-semibold text-muted">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'h-13 rounded-control border-[1.5px] px-4 text-base text-ink placeholder:text-subtle',
          error ? 'border-danger' : 'border-line-strong',
          className,
        )}
        {...props}
      />
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('text-[13px]', error ? 'text-danger' : 'text-subtle')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
