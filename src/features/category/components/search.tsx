'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSearch } from 'react-icons/lu';
import z from 'zod';

const formSchema = z.object({
  email: z.string().min(1),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error('Form submission error', error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center bg-background rounded-full p-1 overflow-hidden border"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Search"
                  type="text"
                  className="w-full bg-background dark:bg-transparent border-none shadow-none outline-none dark:focus-visible:ring-offset-0 focus-visible:ring-0"
                  {...field}
                  aria-label="Search query"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'icon'} shadow={"sm"} className="size-11 cursor-pointer mb-1 mr-1" aria-label="Search">
          <LuSearch className="size-5" aria-hidden="true" />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
