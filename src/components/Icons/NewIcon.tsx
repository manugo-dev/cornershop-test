import { IconsProps } from 'types/Icons';

function NewIcon({ fill = 'var(--dark-black)' }: IconsProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 10C0 9.21102 0.639593 8.57143 1.42857 8.57143H18.5714C19.3604 8.57143 20 9.21102 20 10C20 10.789 19.3604 11.4286 18.5714 11.4286H1.42857C0.639594 11.4286 0 10.789 0 10Z"
        fill={fill}
      />
      <path
        d="M10 20C9.21102 20 8.57143 19.3604 8.57143 18.5714V1.42857C8.57143 0.639594 9.21102 4.10399e-08 10 0C10.789 -4.10399e-08 11.4286 0.639593 11.4286 1.42857L11.4286 18.5714C11.4286 19.3604 10.789 20 10 20Z"
        fill={fill}
      />
    </svg>
  );
}

export default NewIcon;
