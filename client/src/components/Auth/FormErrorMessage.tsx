export default function FormErrorMessage({ message }: { message: string }) {
  return (
    <p role="alert" data-testid="form-error-msg" className="text-red-500">
      {message}
    </p>
  );
}
