import { ComponentPropsWithoutRef } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { Input } from '@hsp/ui/components/input'
import { Label } from '@hsp/ui/components/label'
import genericMemo from '@hsp/ui/utils/react/generic-memo'

export const FormInput = genericMemo(function FormInput<T extends FieldValues>({
  label,
  InputProps,
  name,
  rules,
  control,
}: {
  label: string
  InputProps?: ComponentPropsWithoutRef<typeof Input>
} & Omit<ComponentPropsWithoutRef<typeof Controller<T>>, 'render'>) {
  return (
    <div>
      <Label htmlFor={name} className="block mb-2">
        {label}
      </Label>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, formState }) => {
          return (
            <div>
              <Input
                className="w-full"
                {...InputProps}
                {...field}
              />
              <span className="text-error-300 text-xs">
              <>{formState.errors?.[name]?.message || ''}</>
              </span>
            </div>
          )
        }}
      />
    </div>
  )
})
