import type { InputHTMLAttributes } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export default function InputPair({
  label,
  description,
  textArea = false,
  ref,
  ...rest
}: {
  label: string
  description: string
  textArea?: boolean
  ref?: React.RefObject<HTMLInputElement | null>
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="space-y-2 flex flex-col ">
      <Label htmlFor={rest.id} className="flex flex-col gap-1">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? <Textarea rows={4} className="resize-none" {...rest} /> : <Input ref={ref} {...rest} />}
    </div>
  )
}
