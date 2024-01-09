import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

export function FormProvider({
  children,
  onSubmit,
  methods,
}: any): JSX.Element {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
