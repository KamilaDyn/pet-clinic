interface AlertProps {
  text: string;
  type: 'danger' | 'success' | 'warning';
}
const Alert = ({ text, type }: AlertProps) => {
  return (
    <div className={`alert alert-${type}`} role='alert'>
      {text}
    </div>
  );
};

export default Alert;
