export interface MyToastProps {
  hideTime: number;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}
