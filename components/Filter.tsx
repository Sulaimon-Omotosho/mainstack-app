'use client'
import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from './ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { metaType, status } from '@/constants'
import { FilterProps } from '@/lib/types'

const FormSchema = z.object({
  transactionTypes: z.array(z.string()),
  transactionStatuses: z.array(z.string()),
})

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [fromDate, setFromDate] = React.useState<Date>()
  const [toDate, setToDate] = React.useState<Date>()

  const defaultTransactionTypes = metaType.map((item) => item.id)
  const defaultTransactionStatuses = status.map((item) => item.id)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transactionTypes: defaultTransactionTypes,
      transactionStatuses: defaultTransactionStatuses,
    },
  })

  const handleApplyFilter = () => {
    const { transactionTypes, transactionStatuses } = form.getValues()
    onFilter(fromDate, toDate, transactionTypes, transactionStatuses)
  }

  const handleClearFilter = () => {
    form.reset({
      transactionTypes: defaultTransactionTypes,
      transactionStatuses: defaultTransactionStatuses,
    })
    setFromDate(undefined)
    setToDate(undefined)
  }

  return (
    <Drawer direction='right'>
      <DrawerTrigger className='text-sm px-6  text-black bg-gray-200 rounded-full flex gap-1 justify-center items-center hover:bg-gray-300 '>
        Filter
      </DrawerTrigger>
      <DrawerContent className='w-[456px] z-[62] m-4 rounded-lg'>
        <DrawerHeader>
          <DrawerTitle className='flex justify-between items-center font-bold'>
            Filter
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerTitle>
          <div className='flex justify-between items-center mt-8'>
            <p className='p-2 ring-[1px] rounded-full text-xs'>Today</p>
            <p className='p-2 ring-[1px] rounded-full text-xs'>Last 7 Days</p>
            <p className='p-2 ring-[1px] rounded-full text-xs'>This Month</p>
            <p className='p-2 ring-[1px] rounded-full text-xs'>Last 3 months</p>
          </div>
        </DrawerHeader>

        {/* DATE PICKER  */}
        <div className='mt-4 px-4 '>
          <h2 className='text-sm text-black mb-2'>Date Range</h2>
          <div className='flex gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-1/2 justify-start text-left font-normal bg-slate-200 border-none',
                    !fromDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {fromDate ? (
                    format(fromDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0 z-[62]'>
                <Calendar
                  mode='single'
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-1/2 justify-start text-left font-normal bg-slate-200 border-none',
                    !toDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0 z-[62]'>
                <Calendar
                  mode='single'
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* TRANSACTION TYPE  */}
        <div className='mt-4 px-4'>
          <h2 className='text-sm text-black mb-2'>Transaction Type</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full bg-slate-200 border-none rounded-md p-2 text-left truncate'>
              {form.watch('transactionTypes').length > 0 ? (
                <span className='block truncate'>
                  {form
                    .watch('transactionTypes')
                    .map((id) => metaType.find((t) => t.id === id)?.label)
                    .join(', ')}
                </span>
              ) : (
                'Select Transaction ...'
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[62]'>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name='transactionTypes'
                  render={({ field }) => (
                    <FormItem>
                      <div className='w-[350px] h-[250px] flex flex-col space-y-6 overflow-y-auto mt-4 ml-4'>
                        {metaType.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name='transactionTypes'
                            render={({ field }) => {
                              return (
                                <FormItem className='flex items-start space-x-3 space-y-0'>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className='text-sm font-normal'>
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </Form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* TRANSACTION STATUS  */}
        <div className='mt-4 px-4'>
          <h2 className='text-sm text-black mb-2'>Transaction Status</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full bg-slate-200 border-none rounded-md p-2'>
              {form.watch('transactionStatuses').length > 0 ? (
                <span className='block truncate'>
                  {form
                    .watch('transactionStatuses')
                    .map((id) => status.find((s) => s.id === id)?.label)
                    .join(',')}
                </span>
              ) : (
                'Status ...'
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[62]'>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name='transactionStatuses'
                  render={() => (
                    <FormItem>
                      <div className='w-[350px] h-[130px] flex flex-col space-y-6 overflow-y-auto mt-4 ml-4'>
                        {status.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name='transactionStatuses'
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className='flex flex-row items-start space-x-3 space-y-0'
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className='text-sm font-normal'>
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </Form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DrawerFooter className='flex-row gap-3'>
          <Button
            onClick={handleClearFilter}
            className='flex-1/2 rounded-full bg-white text-black ring-[1px] hover:bg-gray-200'
          >
            Clear
          </Button>
          <Button
            onClick={handleApplyFilter}
            className='flex-1/2 rounded-full bg-slate-200'
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Filter
