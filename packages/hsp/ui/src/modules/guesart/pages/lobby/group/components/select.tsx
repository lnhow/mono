import { ComponentPropsWithoutRef } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import genericMemo from '@hsp/ui/src/hooks/genericMemo'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@hsp/ui/src/components/base/select'
import { Label } from '@hsp/ui/src/components/base/label'

export const FormSelect = genericMemo(function FormSelect<
  T extends FieldValues,
>({
  label,
  placeholder,
  name,
  rules,
  control,
  options,
  InputProps,
}: {
  label: string
  InputProps?: ComponentPropsWithoutRef<typeof Select>
  placeholder?: string
  options: {
    value: string
    label: string
  }[] | string[]
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
              <Select
                // className="w-full"
                {...InputProps}
                {...field}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => {
                    if (typeof option === 'string') {
                      return (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      )
                    }
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <span className="text-error-300 text-xs">
                <>{formState.errors?.[name]?.message || ''}</>
              </span>
            </div>
          )
        }}
      />
    </div>
    // <Select {...register('theme', { required: true })}>
    //   <SelectTrigger>
    //     <SelectValue placeholder="Select Theme" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     {themes.map((theme) => (
    //       <SelectItem key={theme} value={theme}>
    //         {theme}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </Select>
  )
})
